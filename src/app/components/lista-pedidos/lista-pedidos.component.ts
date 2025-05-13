import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  dataSource = new MatTableDataSource<Pedido>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  estadoTotales = {
  pendiente: 0,
  proceso: 0,
  completado: 0,
  cancelado: 0
};

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
      const estadosValidos = ['pendiente', 'proceso', 'completado', 'cancelado'] as const;

      // Normalizar y forzar tipo literal
      const pedidosNormalizados: Pedido[] = pedidos.map(p => {
        const estadoNormalizado = p.estado.toLowerCase();

        // Validar que el estado está dentro de los permitidos
        const estadoValido = estadosValidos.includes(estadoNormalizado as any)
          ? estadoNormalizado as Pedido['estado']
          : 'pendiente';

        return {
          ...p,
          estado: estadoValido
        };
      });

      // Ordenar por estado personalizado
      const ordenEstado = {
        pendiente: 0,
        proceso: 1,
        completado: 2,
        cancelado: 3
      };

      const pedidosOrdenados = pedidosNormalizados.sort((a, b) => {
      const estadoOrdenA = ordenEstado[a.estado];
      const estadoOrdenB = ordenEstado[b.estado];

      if (estadoOrdenA !== estadoOrdenB) {
        return estadoOrdenA - estadoOrdenB;
      }

      // Si el estado es igual, ordenar por fechaCreacion descendente
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return fechaB - fechaA;
    });

      this.dataSource.data = pedidosOrdenados;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Contar estados
      this.estadoTotales = {
        pendiente: pedidosNormalizados.filter(p => p.estado === 'pendiente').length,
        proceso: pedidosNormalizados.filter(p => p.estado === 'proceso').length,
        completado: pedidosNormalizados.filter(p => p.estado === 'completado').length,
        cancelado: pedidosNormalizados.filter(p => p.estado === 'cancelado').length
      };
    },
    (error) => {
      console.error('Error al obtener los pedidos:', error);
    }
  );
} 

  cambiarEstado(pedido: Pedido, nuevoEstado: string): void {
    this.pedidoService.actualizarEstadoPedido(pedido.id, nuevoEstado).subscribe({
      next: () => {
        console.log('Estado actualizado correctamente');
        this.getpedidos();
        // Actualizar la vista o hacer alguna acción adicional
      },
      error: (err) => {
        console.error('Error al actualizar estado', err);
      }
    });
  }

  getEstadoClase(estado: string): string {
      const estadoLower = estado.toLowerCase();
      switch (estadoLower) {
        case 'pendiente': return 'estado-pendiente';
        case 'proceso': return 'estado-proceso';
        case 'completado': return 'estado-completado';
        case 'cancelado': return 'estado-cancelado';
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