import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto.interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mi-usuario',
  templateUrl: './mi-usuario.component.html',
  styleUrls: ['./mi-usuario.component.css']
})
export class MiUsuarioComponent implements OnInit {
  mostrarSpinner = true;

  nombreUsuario: string = '';
  apellidosUsuario:string = '';
  idUsuario:string = '';
  estadoSeleccionado:string = 'Disponible';

  visibility: string = 'd-none';
  avisoProductosEncontrados:boolean = false;

  productos:Producto[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    let usuarioString = localStorage.getItem('usuario');
    let usuarioJson = usuarioString ? JSON.parse(usuarioString) : null;

    this.nombreUsuario = usuarioJson.nombre;
    this.apellidosUsuario = usuarioJson.apellidos;

    this.idUsuario = usuarioJson._id;

    this.mostrarProductos();
  }

  logOut() {
    localStorage.removeItem('usuario');
  }

  mostrarProductos(){
    this.mostrarSpinner = true;

      this.visibility = 'd-none';
      this.avisoProductosEncontrados = false;
      this.api.getProductosDeUsuarioPorEstado(this.idUsuario,this.estadoSeleccionado).subscribe((res) =>{
        console.log(res);
        this.visibility = 'd-flex';
        this.productos = res;
        this.mostrarSpinner = false;
      },
      (error:HttpErrorResponse) => {
        this.avisoProductosEncontrados = true;
        this.visibility = 'd-none';
        this.mostrarSpinner = false;
      });


  }

}
