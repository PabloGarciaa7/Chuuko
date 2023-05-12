import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  nombre: string = '';
  precio: number = 0;
  imagen: string = '';
  idUsuarioVendedor: string = '';
  descripcion: string = '';
  fechaCreacion: string = '';
  estado: string = '';

  nombreUsuario: string = '';

  idUsuario: string = '';
  opcionBoton: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  async ngOnInit() {
    let usuarioString = localStorage.getItem('usuario');
    let usuarioJson = usuarioString ? JSON.parse(usuarioString) : null;

    this.idUsuario = usuarioJson._id;

    this.route.params.subscribe((params) => {
      const idProducto = params['id'];
      this.api.getProductoPorId(idProducto).subscribe((res) => {
        this.nombre = res.nombre;
        this.precio = res.precio;
        this.imagen = res.imagen;
        this.idUsuarioVendedor = res.idUsuarioVendedor._id;
        this.descripcion = res.descripcion;
        this.fechaCreacion = res.fechaCreacion;
        this.nombreUsuario = res.idUsuarioVendedor.nombre;
        this.estado = res.estado;
      });
    });

    this.comprobarProducto();
  }

  comprar() {}

  comprobarProducto() {

    if (this.idUsuario === this.idUsuarioVendedor && this.estado === 'Disponible') {
      this.opcionBoton = 'opcion1';
    } else if (this.idUsuario === this.idUsuarioVendedor && this.estado === 'Reservado') {
      this.opcionBoton = 'opcion2';
    }
    console.log(this.idUsuario);
    console.log(this.idUsuarioVendedor);
    console.log(this.estado);
  }
}
