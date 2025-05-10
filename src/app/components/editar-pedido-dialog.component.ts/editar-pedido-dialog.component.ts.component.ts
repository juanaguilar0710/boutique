import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PedidoService } from '../../services/pedido.service';
import { DocumentoPedido } from '../../models/pedido.model';
import { Pedido } from '../lista-pedidos/lista-pedidos.component';
import { MatListModule } from '@angular/material/list';
import { FileSizePipe } from "../../shared/pipes/FileSizePipe";

@Component({
  selector: 'app-editar-pedido-dialog',
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
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    DatePipe,
    FileSizePipe
],
  templateUrl: './editar-pedido-dialog.component.ts.component.html',
  styleUrl: './editar-pedido-dialog.component.ts.component.scss'
})
export class EditarPedidoDialogComponent implements OnInit {
  form!: FormGroup;
  facturaFile: File | null = null;
  documentoFile: File | null = null;
  documentosFiles: File[] = [];
  estadosPedido = ['Pendiente', 'Proceso', 'Completado', 'Cancelado'];
  metodosPago = ['sinpe', 'transferencia'];
  tiposRetiro = ['envio', 'tienda'];

  provincias = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];
  cantones: { [key: string]: string[] } = {
    'San José': ['San José', 'Escazú', 'Desamparados', 'Puriscal', 'Tarrazú', 'Aserrí', 'Mora', 'Goicoechea', 'Santa Ana', 'Alajuelita', 'Vázquez de Coronado', 'Acosta', 'Tibás', 'Moravia', 'Montes de Oca', 'Turrubares', 'Dota', 'Curridabat', 'Pérez Zeledón', 'León Cortés Castro'], 
    'Alajuela': ['Alajuela', 'San Ramón', 'Grecia', 'San Mateo', 'Atenas', 'Naranjo', 'Palmares', 'Poás', 'Orotina', 'San Carlos', 'Zarcero', 'Valverde Vega', 'Upala', 'Los Chiles', 'Guatuso', 'Río Cuarto'], 
    'Cartago': ['Cartago', 'Paraíso', 'La Unión', 'Jiménez', 'Turrialba', 'Alvarado', 'Oreamuno', 'El Guarco'], 
    'Heredia': ['Heredia', 'Barva', 'Santo Domingo', 'Santa Bárbara', 'San Rafael', 'San Isidro', 'Belén', 'Flores', 'San Pablo', 'Sarapiquí'], 
    'Guanacaste': ['Liberia', 'Nicoya', 'Santa Cruz', 'Bagaces', 'Carrillo', 'Cañas', 'Abangares', 'Tilarán', 'Nandayure', 'La Cruz', 'Hojancha'], 
    'Puntarenas': ['Puntarenas', 'Esparza', 'Buenos Aires', 'Montes de Oro', 'Osa', 'Quepos', 'Golfito', 'Coto Brus', 'Parrita', 'Corredores', 'Garabito', 'Monteverde'], 
    'Limón': ['Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina', 'Guácimo']
  };

  distritos: { [key: string]: string[] } = {
    'San José': ['Carmen', 'Merced', 'Hospital', 'Catedral', 'Zapote', 'San Francisco', 'Uruca', 'Mata Redonda', 'Pavas', 'Hatillo', 'San Sebastián'],
    'Escazú': ['Escazú', 'San Antonio', 'San Rafael'],
    'Desamparados': ['Desamparados', 'San Miguel', 'San Juan de Dios', 'San Rafael Arriba', 'San Antonio', 'Frailes', 'Patarrá', 'San Cristóbal', 'Rosario', 'Damas', 'San Rafael Abajo', 'Gravilias', 'Los Guido'],
    'Puriscal': ['Santiago', 'Mercedes Sur', 'Barbacoas', 'Grifo Alto', 'San Rafael', 'Candelarita', 'Desamparaditos', 'San Antonio', 'Chires'],
    'Tarrazú': ['San Marcos', 'San Lorenzo', 'San Carlos'],
    'Aserrí': ['Aserrí', 'Tarbaca', 'Vuelta de Jorco', 'San Gabriel', 'Legua', 'Monterrey', 'Salitrillos'],
    'Mora': ['Colón', 'Guayabo', 'Tabarcia', 'Piedras Negras', 'Picagres', 'Jaris'],
    'Goicoechea': ['Guadalupe', 'Calle Blancos', 'Mata de Plátano', 'Ipís', 'Rancho Redondo', 'Purral'],
    'Santa Ana': ['Santa Ana', 'Salitral', 'Pozos', 'Uruca', 'Piedades', 'Brasil'],
    'Alajuelita': ['Alajuelita', 'San Josecito', 'San Antonio', 'Concepción', 'San Felipe'],
    'Coronado': ['San Isidro', 'San Rafael', 'Dulce Nombre de Jesús', 'Patalillo', 'Cascajal'],
    'Acosta': ['San Ignacio', 'Guaitil', 'Palmichal', 'Cangrejal', 'Sabanillas'],
    'Tibás': ['San Juan', 'Cinco Esquinas', 'Anselmo Llorente', 'León XIII', 'Colima'],
    'Moravia': ['San Vicente', 'San Jerónimo', 'La Trinidad'],
    'Montes de Oca': ['San Pedro', 'Sabanilla', 'Mercedes', 'San Rafael'],
    'Turrubares': ['San Pablo', 'San Pedro', 'San Juan de Mata', 'San Luis', 'Carara'],
    'Dota': ['Santa María', 'Jardín', 'Copey'],
    'Curridabat': ['Curridabat', 'Granadilla', 'Sánchez', 'Tirrases'],
    'Pérez Zeledón': ['San Isidro de El General', 'General', 'Daniel Flores', 'Rivas', 'San Pedro', 'Platanares', 'Pejibaye', 'Cajón', 'Barú', 'Río Nuevo', 'Páramo'],
    'León Cortés': ['San Pablo', 'San Andrés', 'Llano Bonito', 'San Isidro', 'Santa Cruz', 'San Antonio'],
    'Alajuela': ['Alajuela', 'San José', 'Carrizal', 'San Antonio', 'Guácima', 'San Isidro', 'Sabanilla', 'San Rafael', 'Río Segundo', 'Desamparados', 'Turrúcares', 'Tambor', 'Garita', 'Sarapiquí'],
    'San Ramón': ['San Ramón', 'Santiago', 'San Juan', 'Piedades Norte', 'Piedades Sur', 'San Rafael', 'San Isidro', 'Ángeles', 'Alfaro', 'Volio', 'Concepción', 'Zapotal', 'Peñas Blancas'],
    'Grecia': ['Grecia', 'San Isidro', 'San José', 'San Roque', 'Tacares', 'Río Cuarto', 'Puente de Piedra', 'Bolívar'],
    'San Mateo': ['San Mateo', 'Desmonte', 'Jesús María', 'Labrador'],
    'Atenas': ['Atenas', 'Jesús', 'Mercedes', 'San Isidro', 'Concepción', 'San José', 'Santa Eulalia', 'Escobal'],
    'Naranjo': ['Naranjo', 'San Miguel', 'San José', 'Cirrí Sur', 'San Jerónimo', 'San Juan', 'El Rosario', 'Palmitos'],
    'Palmares': ['Palmares', 'Zaragoza', 'Buenos Aires', 'Santiago', 'Candelaria', 'Esquipulas', 'La Granja'],
    'Poás': ['San Pedro', 'San Juan', 'San Rafael', 'Carrillos', 'Sabana Redonda'],
    'Orotina': ['Orotina', 'El Mastate', 'Hacienda Vieja', 'Coyolar', 'La Ceiba'],
    'San Carlos': ['Quesada', 'Florencia', 'Buenavista', 'Aguas Zarcas', 'Venecia', 'Pital', 'La Fortuna', 'La Tigra', 'La Palmera', 'Venado', 'Cutris', 'Monterrey', 'Pocosol', 'Cristóbal Norte', 'Cristóbal Sur'],
    'Zarcero': ['Zarcero', 'Laguna', 'Tapesco', 'Guadalupe', 'Palmira', 'Zapote', 'Brisas'],
    'Valverde Vega': ['Sarchí Norte', 'Sarchí Sur', 'Toro Amarillo', 'San Pedro', 'Rodríguez'],
    'Upala': ['Upala', 'Aguas Claras', 'San José (Pizote)', 'Bijagua', 'Delicias', 'Dos Ríos', 'Yolillal', 'Canalete'],
    'Los Chiles': ['Los Chiles', 'Caño Negro', 'El Amparo', 'San Jorge'],
    'Guatuso': ['San Rafael', 'Buenavista', 'Cote', 'Katira'],
    'Río Cuarto': ['Río Cuarto', 'Santa Isabel', 'Santa Rita'],
    'Central': ['Oriental', 'Occidental', 'Carmen', 'San Nicolás', 'Aguacaliente', 'Guadalupe', 'Corralillo', 'Tierra Blanca', 'Dulce Nombre', 'Llano Grande', 'Quebradilla'],
    'Paraíso': ['Paraíso', 'Santiago', 'Orosi', 'Cachí', 'Llanos de Santa Lucía'],
    'La Unión': ['Tres Ríos', 'San Diego', 'San Juan', 'San Rafael', 'Concepción', 'Dulce Nombre', 'San Ramón', 'Río Azul'],
    'Jiménez': ['Juan Viñas', 'Tucurrique', 'Pejibaye'],
    'Turrialba': ['Turrialba', 'La Suiza', 'Peralta', 'Santa Cruz', 'Santa Teresita', 'Pavones', 'Tuis', 'Tayutic', 'Santa Rosa', 'Tres Equis', 'La Isabel', 'Chirripó'],
    'Alvarado': ['Pacayas', 'Cervantes', 'Capellades'],
    'Oreamuno': ['San Rafael', 'Cot', 'Potrero Cerrado', 'Cipreses', 'Santa Rosa'],
    'El Guarco': ['El Tejar', 'San Isidro', 'Tobosi', 'Patio de Agua'],
    'Heredia': ['Heredia', 'Mercedes', 'San Francisco', 'Ulloa', 'Varablanca'],
    'Barva': ['Barva', 'San Pedro', 'San Pablo', 'San Roque', 'Santa Lucía', 'San José de la Montaña'],
    'Santo Domingo': ['Santo Domingo', 'San Vicente', 'San Miguel', 'Paracito', 'Santo Tomás', 'Santa Rosa', 'Tures', 'Paraíso'],
    'Santa Bárbara': ['Santa Bárbara', 'San Pedro', 'San Juan', 'Jesús', 'Santo Domingo', 'Puraba'],
    'San Rafael': ['San Rafael', 'San Josecito', 'Santiago', 'Ángeles', 'Concepción'],
    'San Isidro': ['San Isidro', 'San José', 'Concepción', 'San Francisco'],
    'Belén': ['San Antonio', 'La Ribera', 'La Asunción'],
    'Flores': ['San Joaquín', 'Barrantes', 'Llorente'],
    'San Pablo': ['San Pablo', 'Rincón de Sabanilla'],
    'Sarapiquí': ['Puerto Viejo', 'La Virgen', 'Las Horquetas', 'Llanuras del Gaspar', 'Cureña'],
    'Liberia': ['Liberia', 'Cañas Dulces', 'Mayorga', 'Nacascolo', 'Curubandé'],
    'Nicoya': ['Nicoya', 'Mansión', 'San Antonio', 'Quebrada Honda', 'Sámara', 'Nosara', 'Belén de Nosarita'],
    'Santa Cruz': ['Santa Cruz', 'Bolsón', 'Veintisiete de Abril', 'Tempate', 'Cartagena', 'Cuajiniquil', 'Diriá', 'Cabo Velas', 'Tamarindo'],
    'Bagaces': ['Bagaces', 'Fortuna', 'Mogote', 'Río Naranjo'],
    'Carrillo': ['Filadelfia', 'Palmira', 'Sardinal', 'Belén'],
    'Cañas': ['Cañas', 'Palmira', 'San Miguel', 'Bebedero', 'Porozal'],
    'Abangares': ['Las Juntas', 'Sierra', 'San Juan', 'Colorado'],
    'Tilarán': ['Tilarán', 'Quebrada Grande', 'Tronadora', 'Santa Rosa', 'Líbano', 'Tierras Morenas', 'Arenal'],
    'Nandayure': ['Carmona', 'Santa Rita', 'Zapotal', 'San Pablo', 'Porvenir', 'Bejuco'],
    'La Cruz': ['La Cruz', 'Santa Cecilia', 'Garita', 'Santa Elena'],
    'Hojancha': ['Hojancha', 'Monte Romo', 'Puerto Carrillo', 'Huacas', 'Matambú'],
    'Puntarenas': ['Puntarenas', 'Pitahaya', 'Chomes', 'Lepanto', 'Paquera', 'Manzanillo', 'Guacimal', 'Barranca', 'Monte Verde', 'Isla del Coco', 'Cóbano', 'Chacarita', 'Chira', 'Acapulco', 'El Roble', 'Arancibia'],
    'Esparza': ['Espíritu Santo', 'San Juan Grande', 'Macacona', 'San Rafael', 'San Jerónimo'],
    'Buenos Aires': ['Buenos Aires', 'Volcán', 'Potrero Grande', 'Boruca', 'Pilas', 'Colinas', 'Chánguena', 'Biolley', 'Brunka', 'Potrero Grande'],
    'Montes de Oro': ['Miramar', 'La Unión', 'San Isidro'],
    'Osa': ['Puerto Cortés', 'Palmar', 'Sierpe', 'Bahía Ballena', 'Piedras Blancas', 'Bahía Drake'],
    'Quepos': ['Quepos', 'Savegre', 'Naranjito'],
    'Golfito': ['Golfito', 'Puerto Jiménez', 'Guaycará', 'Pavón'],
    'Coto Brus': ['San Vito', 'Sabalito', 'Agua Buena', 'Limoncito', 'Pittier'],
    'Parrita': ['Parrita'],
    'Corredores': ['Corredor', 'La Cuesta', 'Canoas', 'Laurel'],
    'Garabito': ['Jacó', 'Tárcoles'],
    'Pococí': ['Guápiles', 'Jiménez', 'Rita', 'Roxana', 'Cariari', 'Colorado', 'La Colonia'],
    'Siquirres': ['Siquirres', 'Pacuarito', 'Florida', 'Germania', 'Cairo', 'Alegría'],
    'Talamanca': ['Bratsi', 'Sixaola', 'Cahuita', 'Telire'],
    'Matina': ['Matina', 'Batán', 'Carrandi'],
    'Guácimo': ['Guácimo', 'Mercedes', 'Pocora', 'Río Jiménez', 'Duacarí' ]
  };

  pedido!: Pedido;
  documentos: DocumentoPedido[] = [];
  documentosCargados: any[] = [];
  isLoading = true;

   constructor(
    public dialogRef: MatDialogRef<EditarPedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupLocationListeners();
    this.cargarDetalles();
    console.log(this.data);
    
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [this.data.id, Validators.required],
      cliente: [this.data.cliente, [Validators.required, Validators.minLength(3)]],
      email: [this.data.email, [Validators.required, Validators.email]],
      telefono: [this.data.telefono, [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      producto: [this.data.producto, Validators.required],
      cantidad: [this.data.cantidad, [Validators.required, Validators.min(1)]],
      monto: [this.data.monto, [Validators.required, Validators.min(0)]],
      metodoPago: [this.data.metodoPago, Validators.required],
      tipoRetiro: [this.data.tipoRetiro, Validators.required],
      provincia: [this.data.provincia, Validators.required],
      canton: [this.data.canton, Validators.required],
      distrito: [this.data.distrito, Validators.required],
      direccionExacta: [this.data.direccionExacta, Validators.required],
      notas: [this.data.notas],
      fechaCreacion: [new Date(this.data.fechaCreacion)],
      estado: [this.data.estado, Validators.required],
      numeroGuia: [this.data.numeroGuia],
      numeroFactura: [this.data.numeroFactura],
      codigoSeguimiento: [{value: this.data.codigoSeguimiento, disabled:true}],
      factura: [null],
      documentos: [null]
    });
  }

  cargarDetalles(): void {
    this.pedidoService.obtenerPedidoConDocumentos(this.data.id).subscribe({
      next: (response) => {
        this.pedido = response.pedido as Pedido;
        this.documentos = response.documentos;
        if (response.documentos && response.documentos.length > 0) {
          this.documentosCargados = response.documentos.map((doc: any) => ({
            ...doc,
            fechaFormateada: new Date(doc.fechaCreacion).toLocaleDateString()
          }));
        }

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.dialogRef.close();
      }
    });
  }

  descargarDocumento(documento: DocumentoPedido): void {
    this.pedidoService.descargarDocumento(documento.id).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: documento.tipoContenido });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = documento.nombreArchivo;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => console.error('Error al descargar documento')
    });
  }

  setupLocationListeners(): void {
    this.form.get('provincia')?.valueChanges.subscribe(provincia => {
      this.form.get('canton')?.reset();
      this.form.get('distrito')?.reset();
    });

    this.form.get('canton')?.valueChanges.subscribe(canton => {
      this.form.get('distrito')?.reset();
    });
  }

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (field === 'factura') {
        this.facturaFile = input.files[0];
        this.form.patchValue({ factura: this.facturaFile?.name });
      } else if (field === 'documentos') {
        this.documentosFiles = Array.from(input.files);
        this.form.patchValue({ 
          documentos: this.documentosFiles.map(f => f.name).join(', ') 
        });
      }
    }
  }

  async guardar() {
    this.form.get('codigoSeguimiento')?.enable();
    this.form.get('codigoSeguimiento')?.setValue(this.data.codigoSeguimiento);
  const steps = [
    {
      name: 'Actualizar pedido',
      action: async () => {
        const datosParaActualizar = {
        ...this.form.value,
        documentos: undefined // Elimina la propiedad documentos
      };
        await this.pedidoService.actualizarPedido(this.data.id, datosParaActualizar).toPromise();
        return 'Pedido actualizado correctamente';
      }
    },
    {
      name: 'Actualizar guía',
      condition: this.form.controls['numeroGuia'].value !== this.data.numeroGuia,
      action: async () => {
        await this.pedidoService.actualizarGuia(this.data.id, this.form.controls['numeroGuia'].value).toPromise();
        return 'Número de guía actualizado correctamente';
      }
    },
    {
      name: 'Actualizar factura',
      condition: this.form.controls['numeroFactura'].value !== this.data.numeroFactura,
      action: async () => {
        await this.pedidoService.actualizarFactura(this.data.id, this.form.controls['numeroFactura'].value).toPromise();
        return 'Número de factura actualizado correctamente';
      }
    },
    {
      name: 'Subir factura',
      condition: this.facturaFile,
      action: async () => {
        if (this.facturaFile) {
          await this.pedidoService.subirComprobante(this.data.id, this.facturaFile, "FACTURA").toPromise();
        }
        return 'Factura cargada correctamente';
      }
    },
    {
      name: 'Subir documentos',
      condition: this.documentosFiles.length > 0,
      action: async () => {
        for (const file of this.documentosFiles) {
          await this.pedidoService.subirComprobante(this.data.id, file, "OTROS").toPromise();
        }
        return `Se cargaron ${this.documentosFiles.length} documentos correctamente`;
      }
    }
  ];

  let currentStep: { name: string } | null = null;

  try {
    for (const step of steps) {
      currentStep = step;
      if (step.condition === undefined || step.condition) {
        const message = await step.action();
        this.mostrarNotificacion('Éxito', message, 'success');
      }
    }
    this.dialogRef.close(true);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    this.mostrarNotificacion('Error', `Falló al ${currentStep?.name}: ${errorMessage}`, 'error');
    throw error; // Opcional: relanzar el error si necesitas manejarlo fuera
  }
}

  mostrarNotificacion(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'info') {
    // Implementa tu lógica de notificación (Toast, Snackbar, Alert, etc.)
    console.log(`[${tipo}] ${titulo}: ${mensaje}`);
    // Ejemplo con Angular Material SnackBar:
    this.snackBar.open(mensaje, titulo, {
      duration: 5000,
      panelClass: tipo === 'error' ? 'error-snackbar' : 'success-snackbar'
    });
  }

  

  getDocumentoColorClass(tipoDocumento: string): string {
    tipoDocumento = tipoDocumento?.toLowerCase() || 'otros';  
    if (tipoDocumento.includes('factura')) {
      return 'factura';
    } else if (tipoDocumento.includes('comprobante')) {
      return 'comprobante';
    } else {
      return 'otros';
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  get cantonesActuales(): string[] {
    return this.cantones[this.form.get('provincia')?.value] || [];
  }

  get distritosActuales(): string[] {
    return this.distritos[this.form.get('canton')?.value] || [];
  }
}