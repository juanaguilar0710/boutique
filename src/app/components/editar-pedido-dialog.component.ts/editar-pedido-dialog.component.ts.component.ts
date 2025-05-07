import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-pedido-dialog.component.ts',
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
    MatDialogModule    
  ],
  templateUrl: './editar-pedido-dialog.component.ts.component.html',
  styleUrl: './editar-pedido-dialog.component.ts.component.scss'
})
export class EditarPedidoDialogComponent implements OnInit {
  form!: FormGroup;
  facturaFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditarPedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    console.log('Data received in dialog:', data);    
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      numeroGuia: [this.data.numeroGuia || ''],
      factura: [null, []],
      id: [this.data.id],
      cliente: [this.data.cliente],
      email: [this.data.email],
      telefono: [this.data.telefono],
      fecha: [this.data.fecha],
      estado: [this.data.estado],
      metodoPago: [this.data.metodoPago],
      monto: [this.data.monto],
      tipoRetiro: [this.data.tipoRetiro]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.facturaFile = input?.files?.[0] || null;
  }

  guardar() {
    this.dialogRef.close({
      numeroGuia: this.form.value.numeroGuia,
      factura: this.facturaFile
    });
  }

}
