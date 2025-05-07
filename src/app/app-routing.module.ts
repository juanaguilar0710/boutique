import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';
import { ConsultarPedidoComponent } from './components/consulta-pedido/consulta-pedido.component';
import { ListaPedidosComponent } from './components/lista-pedidos/lista-pedidos.component';

const routes: Routes = [
  { path: '', redirectTo: '/nuevo-pedido', pathMatch: 'full' },
  { path: 'nuevo-pedido', component: NuevoPedidoComponent },
  { path: 'consulta', component: ConsultarPedidoComponent },
  { path: 'lista-pedidos', component: ListaPedidosComponent },
  { path: '**', redirectTo: '/nuevo-pedido' } // Redirección para rutas no encontradas
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }