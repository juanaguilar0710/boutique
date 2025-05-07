import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <h2 mat-dialog-title>Detalle del Pedido #{{data.id}}</h2>
    <mat-dialog-content>
      <mat-list>
        <mat-list-item>
          <mat-icon matListItemIcon>person</mat-icon>
          <div matListItemTitle>{{data.cliente}}</div>
          <div matListItemLine>{{data.email}}</div>
          <div matListItemLine>{{data.telefono}}</div>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <mat-icon matListItemIcon>date_range</mat-icon>
          <div matListItemTitle>Fecha</div>
          <div matListItemLine>{{data.fecha | date:'fullDate'}}</div>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <mat-icon matListItemIcon>payments</mat-icon>
          <div matListItemTitle>Método de pago</div>
          <div matListItemLine>{{data.metodoPago}}</div>
          <div matListItemLine>Monto: ₡{{data.monto | number}}</div>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <mat-icon matListItemIcon>local_shipping</mat-icon>
          <div matListItemTitle>Tipo de retiro</div>
          <div matListItemLine>{{data.tipoRetiro}}</div>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <mat-icon matListItemIcon>info</mat-icon>
          <div matListItemTitle>Estado</div>
          <div matListItemLine>
            <mat-chip [color]="getEstadoColor(data.estado)">
              {{data.estado | uppercase}}
            </mat-chip>
          </div>
        </mat-list-item>
      </mat-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-list-item {
      height: auto !important;
      margin: 10px 0;
    }
  `]
})
export class PedidoDetalleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'primary';
      case 'proceso': return 'accent';
      case 'completado': return 'warn';
      case 'cancelado': return '';
      default: return '';
    }
  }
}