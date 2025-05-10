import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PedidoDetalleComponent } from '../lista-pedidos/pedido-detalle.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditarPedidoDialogComponent } from '../editar-pedido-dialog.component.ts/editar-pedido-dialog.component.ts.component';
import { PedidoService } from '../../services/pedido.service';

export interface Pedido {
  id: number;
  cliente: string;
  email: string;
  telefono: string;
  fecha: Date;
  estado: 'pendiente' | 'proceso' | 'completado' | 'cancelado';
  metodoPago: string;
  monto: number;
  tipoRetiro: string;
}

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cliente', 'codigo','fecha', 'monto', 'estado', 'acciones'];
  dataSource: Pedido[] = [];

  constructor(private dialog: MatDialog,private pedidoService: PedidoService) {}
  ngOnInit(): void {
    this.getpedidos();
  }

  verDetalle(pedido: Pedido): void {
    this.dialog.open(PedidoDetalleComponent, {
      width: '600px',
      data: pedido
    });
  }

  getpedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe(
      (pedidos: Pedido[]) => {
        this.dataSource = pedidos;
      },
      (error) => {
        console.error('Error al obtener los pedidos:', error);
      });
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: string): void {
    pedido.estado = nuevoEstado as any;
    // Aquí normalmente harías una llamada HTTP para actualizar en el servidor
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'primary';
      case 'proceso': return 'accent';
      case 'completado': return 'warn';
      case 'cancelado': return '';
      default: return '';
    }
  }

  editarPedido(pedido: any) {
    const dialogRef = this.dialog.open(EditarPedidoDialogComponent, {
      width: '800px',
      data: pedido // Pasamos los datos del pedido a editar
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getpedidos();
      }
    });
  }
}