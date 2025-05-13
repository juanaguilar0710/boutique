import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetallePedidoDialogComponent } from '../detalle-pedido-dialog/detalle-pedido-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  templateUrl: './consulta-pedido.component.html',
  styleUrls: ['./consulta-pedido.component.scss']
})
export class ConsultarPedidoComponent implements OnInit {
  // Formularios
  consultaFormCodigo!: FormGroup;
  consultaFormGuia!: FormGroup;
  consultaFormCliente!: FormGroup;
  
  // Estado del componente
  activeTab = 0;
  isLoading = false;
  mostrarResultados = false;
  pedidosEncontrados: Pedido[] = [];
  
  // Constantes para UI
  readonly TABS = {
    CODIGO: 0,
    GUIA: 1,
    CLIENTE: 2
  };

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.inicializarFormularios();
  }
  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if(codigo) {
      this.consultaFormCodigo.patchValue({ codigoSeguimiento: codigo });
      this.buscarPorCodigo();
    }
  }

  // Inicialización de formularios
  private inicializarFormularios(): void {
    this.consultaFormCodigo = this.fb.group({
      codigoSeguimiento: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9]{6}$/),
        Validators.maxLength(6)
      ]]
    });

    this.consultaFormGuia = this.fb.group({
      numeroGuia: ['', Validators.required]
    });

    this.consultaFormCliente = this.fb.group({
      email: ['', [Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]{8}$')]]
    }, { validator: this.alMenosUnCampoRequerido(['email', 'telefono']) });
  }

  // Validación personalizada para requerir al menos un campo
  private alMenosUnCampoRequerido(campos: string[]) {
    return (group: FormGroup) => {
      const tieneValor = campos.some(campo => {
        const control = group.get(campo);
        return control && control.value && control.value.trim() !== '';
      });
      
      return tieneValor ? null : { alMenosUnCampoRequerido: true };
    };
  }

  // Métodos de búsqueda
  buscarPorCodigo(): void {
    if (this.consultaFormCodigo.invalid) return;
    
    this.isLoading = true;
    const codigo = this.consultaFormCodigo.get('codigoSeguimiento')?.value;
    
    this.pedidoService.buscarPorCodigoSeguimiento(codigo).subscribe({
      next: (pedido) => {
        this.pedidosEncontrados = pedido ? [pedido] : [];
        this.mostrarResultados = true;
        
        if (!pedido) {
          this.mostrarMensaje('No se encontró un pedido con ese código');
        }
      },
      error: () => {
        this.mostrarError('Error al buscar por código');
        this.pedidosEncontrados = [];
        this.mostrarResultados = false;
      }
    }).add(() => this.isLoading = false);
  }

  buscarPorGuia(): void {
    if (this.consultaFormGuia.invalid) return;
    
    this.isLoading = true;
    const guia = this.consultaFormGuia.get('numeroGuia')?.value;
    
    this.pedidoService.buscarPorNumeroGuia(guia).subscribe({
      next: (respuesta: any) => {
        // Asegúrate de manejar tanto array como objeto individual
        if (Array.isArray(respuesta)) {
          this.pedidosEncontrados = respuesta;
        } else if (respuesta) {
          this.pedidosEncontrados = [respuesta]; // Convertir objeto en array
        } else {
          this.pedidosEncontrados = [];
        }
        
        this.mostrarResultados = true;
        
        if (this.pedidosEncontrados.length === 0) {
          this.mostrarMensaje('No se encontraron pedidos con este número de guía');
        }
      },
      error: (error) => {
        console.error('Error en búsqueda por guía:', error);
        this.mostrarError('Error al buscar por número de guía');
        this.pedidosEncontrados = [];
        this.mostrarResultados = false;
      }
    }).add(() => this.isLoading = false);
  }

  buscarPorCliente(): void {
    if (this.consultaFormCliente.invalid) {
      this.mostrarMensaje('Por favor ingrese al menos un dato válido (email o teléfono)');
      return;
    }
  
    this.isLoading = true;
    const { email, telefono } = this.consultaFormCliente.value;
  
    this.pedidoService.buscarPorCliente(email, telefono).subscribe({
      next: (pedidos) => {
        this.pedidosEncontrados = pedidos;
        this.mostrarResultados = true;
        
        if (pedidos.length === 0) {
          this.mostrarMensaje('No se encontraron pedidos con los datos proporcionados');
        }
      },
      error: (error) => {
        console.error('Error en búsqueda por cliente:', error);
        this.mostrarError('Error al buscar pedidos');
        this.pedidosEncontrados = [];
        this.mostrarResultados = false;
      }
    }).add(() => this.isLoading = false);
  }


  // Métodos auxiliares
  limpiarBusqueda(): void {
    switch (this.activeTab) {
      case this.TABS.CODIGO:
        this.consultaFormCodigo.reset();
        break;
      case this.TABS.GUIA:
        this.consultaFormGuia.reset();
        break;
      case this.TABS.CLIENTE:
        this.consultaFormCliente.reset();
        break;
    }
    
    this.pedidosEncontrados = [];
    this.mostrarResultados = false;
  }

  verDetalles(pedidoId: number): void {
    this.dialog.open(DetallePedidoDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { pedidoId },
      panelClass: 'detalle-pedido-dialog'
    });
  }

  // Manejo de mensajes
  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
  }

  private mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }
}