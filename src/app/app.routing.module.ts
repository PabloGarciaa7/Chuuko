import { RegisterComponent } from './register/register.component';
import { CompraRealizadaComponent } from './compra-realizada/compra-realizada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuarios/:id', component: UsuarioComponent },
  { path: 'productos/:id', component: ProductoComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'compra-realizada', component: CompraRealizadaComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'subir-producto', component: NuevoProductoComponent }
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
