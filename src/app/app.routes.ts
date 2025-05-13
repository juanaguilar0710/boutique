import { Routes } from '@angular/router';
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';
import { ConsultarPedidoComponent } from './components/consulta-pedido/consulta-pedido.component';
import { ListaPedidosComponent } from './components/lista-pedidos/lista-pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/guards/AuthGuard';

export const routes: Routes = [  // <-- Nota el 'export const routes'
  { path: '', redirectTo: 'nuevo-pedido', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'nuevo-pedido', component: NuevoPedidoComponent },
  { path: 'consulta', component: ConsultarPedidoComponent },
  { path: 'consulta/:codigo', component: ConsultarPedidoComponent },
  { path: 'lista-pedidos', component: ListaPedidosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'nuevo-pedido' }
];