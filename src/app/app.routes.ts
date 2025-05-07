import { Routes } from '@angular/router';
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';
import { ConsultarPedidoComponent } from './components/consulta-pedido/consulta-pedido.component';
import { ListaPedidosComponent } from './components/lista-pedidos/lista-pedidos.component';

export const routes: Routes = [  // <-- Nota el 'export const routes'
  { path: '', redirectTo: 'nuevo-pedido', pathMatch: 'full' },
  { path: 'nuevo-pedido', component: NuevoPedidoComponent },
  { path: 'consulta', component: ConsultarPedidoComponent },
  { path: 'lista-pedidos', component: ListaPedidosComponent },
  { path: '**', redirectTo: 'nuevo-pedido' }
];