import { Producto } from './../interfaces/producto.interfaces';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  mostrarSpinner = true;

  nombreUsuario: string = '';
  apellidosUsuario:string = '';
  idUsuario:string = '';
  estadoSeleccionado:string = 'Disponible';

  visibility: string = 'd-none';
  avisoProductosEncontrados:boolean = false;

  productos:Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      const idUsuario = params['id'];

      this.api.getUsuarioPorId(idUsuario).subscribe((res) => {
        this.nombreUsuario = res.nombre;
        this.apellidosUsuario = res.apellidos;
        this.idUsuario = res._id;
        this.mostrarProductos();
      });
    });


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
