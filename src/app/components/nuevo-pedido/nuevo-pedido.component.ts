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
    MatIconModule
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
  'San José': ['Carmen', 'Merced', 'Hospital', 'Catedral', 'Zapote', 'San Francisco de Dos Ríos', 'Uruca', 'Mata Redonda', 'Pavas', 'Hatillo', 'San Sebastián'],
  'Escazú': ['Escazú', 'San Antonio', 'San Rafael'],
  'Desamparados': ['Desamparados', 'San Miguel', 'San Juan de Dios', 'San Rafael Arriba', 'San Antonio', 'Frailes', 'Patarrá', 'San Cristóbal', 'Rosario', 'Damas', 'San Rafael Abajo', 'Gravilias', 'Los Guido'],
  'Puriscal': ['Santiago', 'Mercedes Sur', 'Barbacoas', 'Grifo Alto', 'San Rafael', 'Candelarita', 'Desamparaditos', 'San Antonio', 'Chires'],
  'Tarrazú': ['San Marcos', 'San Lorenzo', 'San Carlos'],
  'Aserrí': ['Aserrí', 'Tarbaca', 'Vuelta de Jorco', 'San Gabriel', 'Legua', 'Monterrey', 'Salitrillos'],
  'Mora': ['Colón', 'Guayabo', 'Tabarcia', 'Piedras Negras', 'Picagres', 'Jaris', 'Quitirrisí'],
  'Goicoechea': ['Guadalupe', 'San Francisco', 'Calle Blancos', 'Mata de Plátano', 'Ipís', 'Rancho Redondo', 'Purral'],
  'Santa Ana': ['Santa Ana', 'Salitral', 'Pozos', 'Uruca', 'Piedades', 'Brasil'],
  'Alajuelita': ['Alajuelita', 'San Josecito', 'San Antonio', 'Concepción', 'San Felipe'],
  'Vázquez de Coronado': ['San Isidro', 'San Rafael', 'Dulce Nombre de Jesús', 'Patalillo', 'Cascajal'],
  'Acosta': ['San Ignacio', 'Guaitil', 'Palmichal', 'Cangrejal', 'Sabanillas'],
  'Tibás': ['San Juan', 'Cinco Esquinas', 'Anselmo Llorente', 'León XIII', 'Colima'],
  'Moravia': ['San Vicente', 'San Jerónimo', 'La Trinidad'],
  'Montes de Oca': ['San Pedro', 'Sabanilla', 'Mercedes', 'San Rafael'],
  'Turrubares': ['San Pablo', 'San Pedro', 'San Juan de Mata', 'San Luis', 'Carara'],
  'Dota': ['Santa María', 'Jardín', 'Copey'],
  'Curridabat': ['Curridabat', 'Granadilla', 'Sánchez', 'Tirrases'],
  'Pérez Zeledón': ['San Isidro de El General', 'El General', 'Daniel Flores', 'Rivas', 'San Pedro', 'Platanares', 'Pejibaye', 'Cajón', 'Barú', 'Río Nuevo', 'Páramo'],
  'León Cortés Castro': ['San Pablo', 'San Andrés', 'Llano Bonito', 'San Isidro', 'Santa Cruz', 'San Antonio']
};

  archivoComprobante: File | null = null;
  archivoNombre: string = '';

  constructor(private fb: FormBuilder) {
    this.pedidoForm = this.fb.group({
      informacionCliente: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        nombreCompleto: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]{8}')]]
      }),
      metodoPago: ['sinpe', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      tipoRetiro: ['envio', Validators.required],
      direccionEnvio: this.fb.group({
        provincia: ['', Validators.required],
        canton: ['', Validators.required],
        distrito: ['', Validators.required],
        direccionExacta: ['', Validators.required]
      })
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

  onSubmit() {
    if (this.pedidoForm.valid) {
      const pedido = this.pedidoForm.value;
      console.log('Pedido enviado:', pedido);
  
      if (this.archivoComprobante) {
        console.log('Comprobante adjunto:', this.archivoComprobante);
        // Aquí podrías enviarlo al backend, ej. usando FormData
      }
  
      alert('Pedido creado exitosamente!');
      this.pedidoForm.reset({
        metodoPago: 'sinpe',
        tipoRetiro: 'envio'
      });
      this.archivoComprobante = null;
      this.archivoNombre = '';
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
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

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoComprobante = input.files[0];
      this.archivoNombre = this.archivoComprobante.name;
    }
  }






}