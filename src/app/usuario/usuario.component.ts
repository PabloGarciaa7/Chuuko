import { Producto } from './../interfaces/producto.interfaces';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  nombreUsuario: string = '';
  idUsuario:string = '';
  estadoSeleccionado:string = 'Disponible';

  visibility: string = 'd-none';

  productos:Producto[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    let usuarioString = localStorage.getItem('usuario');
    let usuarioJson = usuarioString ? JSON.parse(usuarioString) : null;

    this.nombreUsuario = usuarioJson.nombre;
    this.idUsuario = usuarioJson._id;
    this.mostrarProductos();
  }

  logOut() {
    localStorage.removeItem('usuario');
  }

  mostrarProductos(){
    try {
      this.visibility = 'd-none';
      console.log(this.estadoSeleccionado);
      this.api.getProductosDeUsuarioPorEstado(this.idUsuario,this.estadoSeleccionado).subscribe((res) =>{
        console.log(res);
        this.visibility = 'd-flex';
        this.productos = res;
      });
    } catch (error) {
      console.log(error);
      this.visibility = 'd-none';
    }
  }

}
