import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AppRoutingModule } from './app.routing.module';
import { CompraRealizadaComponent } from './compra-realizada/compra-realizada.component';
import { FormsModule } from '@angular/forms';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { MiUsuarioComponent } from './mi-usuario/mi-usuario.component';
import { SesionComponent } from './sesion/sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    UsuarioComponent,
    ProductoComponent,
    BusquedaComponent,
    CompraRealizadaComponent,
    NuevoProductoComponent,
    MiUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
