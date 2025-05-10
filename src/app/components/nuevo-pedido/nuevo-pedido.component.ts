import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
import { PedidoService } from '../../services/pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSizePipe } from "../../shared/pipes/FileSizePipe";
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nuevo-pedido',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    FileSizePipe,
    MatDividerModule,
    RouterModule
],
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss']
})
export class NuevoPedidoComponent {
  pedidoForm: FormGroup;
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

  archivoComprobante: File | null = null;
  archivoNombre: string = '';
  enviando = false;
  maxFileSize = environment.maxFileSize;
  allowedFileTypes = environment.allowedFileTypes;
  codigoSeguimiento: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: PedidoService,
    private snackBar: MatSnackBar
  ) {
    this.pedidoForm = this.fb.group({
      informacionCliente: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        nombreCompleto: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]{8}')]]
      }),
      producto: ['', Validators.required], // Nuevo campo
      cantidad: [1, [Validators.required, Validators.min(1)]], // Nuevo campo
      metodoPago: ['sinpe', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      tipoRetiro: ['envio', Validators.required],
      direccionEnvio: this.fb.group({
        provincia: [''],
        canton: [''],
        distrito: [''],
        direccionExacta: ['']
      }),
      notas: [''],
      CodigoSeguimiento: ['']
    });

    // Actualizar cantones cuando cambia la provincia
    this.pedidoForm.get('direccionEnvio.provincia')?.valueChanges.subscribe(provincia => {
      this.pedidoForm.get('direccionEnvio.canton')?.reset();
      this.pedidoForm.get('direccionEnvio.distrito')?.reset();
    });

    // Actualizar distritos cuando cambia el cantón
    this.pedidoForm.get('direccionEnvio.canton')?.valueChanges.subscribe(canton => {
      this.pedidoForm.get('direccionEnvio.distrito')?.reset();
    });
  }

  get cantonesDisponibles(): string[] {
    const provincia = this.pedidoForm.get('direccionEnvio.provincia')?.value;
    return provincia ? this.cantones[provincia] || [] : [];
  }

  get distritosDisponibles(): string[] {
    const canton = this.pedidoForm.get('direccionEnvio.canton')?.value;
    return canton ? this.distritos[canton] || [] : [];
  }

  async onSubmit() {
    if (this.pedidoForm.invalid || this.enviando) return;
  
    this.enviando = true;
    this.codigoSeguimiento = null;
    
    try {
      const formValue = this.pedidoForm.value;
  
      // 1. Crear el pedido primero
      const pedidoResponse: any = await this.apiService.crearPedido({
        cliente: formValue.informacionCliente.nombreCompleto,
        email: formValue.informacionCliente.email,
        telefono: formValue.informacionCliente.telefono,
        producto: formValue.producto,
        cantidad: formValue.cantidad,
        monto: formValue.monto,
        metodoPago: formValue.metodoPago,
        tipoRetiro: formValue.tipoRetiro,
        provincia: formValue.direccionEnvio?.provincia || null,
        canton: formValue.direccionEnvio?.canton || null,
        distrito: formValue.direccionEnvio?.distrito || null,
        direccionExacta: formValue.direccionEnvio?.direccionExacta || null,
        notas: formValue.notas || '',
        CodigoSeguimiento: '000000'
      }).toPromise();
  
      // 2. Si hay archivo, subirlo asociado al pedido
      if (this.archivoComprobante) {
        await this.apiService.subirComprobante(
          pedidoResponse.pedido.id, 
          this.archivoComprobante,
          "COMPROBANTE"
        ).toPromise();
      }

      this.codigoSeguimiento = pedidoResponse.codigoSeguimiento;

      this.mostrarSnackbarConCodigo(pedidoResponse.codigoSeguimiento);
  
      this.mostrarMensaje('Pedido creado exitosamente', 'success');
      this.resetFormulario();
    } catch (error) {
      console.error('Error:', error);
      this.snackBar.open('Error al crear el pedido', 'Cerrar', { 
        duration: 5000,
        panelClass: ['snackbar-error']
      });
    } finally {
      this.enviando = false;
    }
  }

  private mostrarSnackbarConCodigo(codigo: string) {
    const snackbarRef = this.snackBar.open(
      `✅ Pedido creado! Código: ${codigo}`,
      'COPIAR',
      { 
        duration: 10000,
        panelClass: ['snackbar-success']
      }
    );

    snackbarRef.onAction().subscribe(() => {
      navigator.clipboard.writeText(codigo);
      this.snackBar.open('¡Código copiado!', '', { 
        duration: 2000,
        panelClass: ['snackbar-info']
      });
    });
  }

  copiarCodigo() {
    if (this.codigoSeguimiento) {
      navigator.clipboard.writeText(this.codigoSeguimiento);
      this.snackBar.open('Código copiado al portapapeles', '', { 
        duration: 2000 
      });
    }
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar tipo de archivo
      if (!this.allowedFileTypes.includes(file.type)) {
        this.mostrarMensaje('Tipo de archivo no permitido', 'error');
        input.value = '';
        return;
      }

      // Validar tamaño
      if (file.size > this.maxFileSize) {
        this.mostrarMensaje('El archivo es demasiado grande (máx. 20MB)', 'error');
        input.value = '';
        return;
      }

      this.archivoComprobante = file;
      this.archivoNombre = file.name;
    }
  }

  public resetFormulario() {
    this.pedidoForm.reset({
      metodoPago: 'sinpe',
      tipoRetiro: 'envio'
    });
    this.archivoComprobante = null;
    this.archivoNombre = '';
  }

  reset(){
    this.codigoSeguimiento = null;
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: tipo === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  alCambiarMonto(event: Event) {
    const valor = (event.target as HTMLInputElement).value.replace(/,/g, '');
    const numero = parseFloat(valor);
    this.pedidoForm.get('monto')?.setValue(numero);
  }
  
  formatearMiles(valor: number): string {
    if (!valor && valor !== 0) return '';
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}