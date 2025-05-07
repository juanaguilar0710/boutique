import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';

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
    MatSnackBarModule
  ],
  templateUrl: './consulta-pedido.component.html',
  styleUrls: ['./consulta-pedido.component.scss']
})
export class ConsultarPedidoComponent {
  consultaFormNumero: FormGroup;
  consultaFormCliente: FormGroup;
  pedidosEncontrados: any[] = [];
  displayedColumns: string[] = ['id', 'cliente', 'fecha', 'estado', 'acciones'];
  activeTab: number = 0;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar
  ) {
    this.consultaFormNumero = this.fb.group({
      numeroPedido: ['', Validators.required]
    });

    this.consultaFormCliente = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  cambiarTab(tab: string) {
    if (tab === 'numero') {
      this.activeTab = 0;
    } else {
      this.activeTab = 1;
    }
  }

  buscarPorNumero() {
    const numeroPedido = this.consultaFormNumero.get('numeroPedido')?.value;
    if (numeroPedido) {
      this.pedidoService.buscarPorNumero(numeroPedido).subscribe({
        next: (pedidos) => {
          this.pedidosEncontrados = pedidos;
          if (pedidos.length === 0) {
            this.mostrarMensaje('No se encontraron pedidos con ese número');
          }
        },
        error: () => this.mostrarMensaje('Error al buscar el pedido')
      });
    }
  }

  buscarPorCliente() {
    const email = this.consultaFormCliente.get('email')?.value;
    const telefono = this.consultaFormCliente.get('telefono')?.value;

    if (email || telefono) {
      this.pedidoService.buscarPorCliente(email, telefono).subscribe({
        next: (pedidos) => {
          this.pedidosEncontrados = pedidos;
          if (pedidos.length === 0) {
            this.mostrarMensaje('No se encontraron pedidos con esos datos');
          }
        },
        error: () => this.mostrarMensaje('Error al buscar pedidos')
      });
    } else {
      this.mostrarMensaje('Ingrese al menos un dato del cliente (email o teléfono)');
    }
  }

  limpiarBusqueda() {
    if (this.activeTab === 0) {
      this.consultaFormNumero.reset();
    } else {
      this.consultaFormCliente.reset();
    }
    this.pedidosEncontrados = [];
  }

  private mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-custom']
    });
  }

}