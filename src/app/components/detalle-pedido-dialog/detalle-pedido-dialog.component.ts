import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';
import { Pedido, DocumentoPedido } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detalle-pedido-dialog',
  templateUrl: './detalle-pedido-dialog.component.html',
  imports: [
    CommonModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule
  ],
  styleUrls: ['./detalle-pedido-dialog.component.scss']
})
export class DetallePedidoDialogComponent {
  pedido!: Pedido;
  documentos: DocumentoPedido[] = [];
  isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<DetallePedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pedidoId: number },
    private pedidoService: PedidoService
  ) {
    this.cargarDetalles();
  }

  cargarDetalles(): void {
    this.pedidoService.obtenerPedidoConDocumentos(this.data.pedidoId).subscribe({
      next: (response) => {
        this.pedido = response.pedido;
        this.documentos = response.documentos;
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

  cerrar(): void {
    this.dialogRef.close();
  }
}