import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
})

export class NuevoProductoComponent implements OnInit {
  usuarioStorageString = localStorage.getItem('usuario');
  usuarioStorageJson = this.usuarioStorageString
    ? JSON.parse(this.usuarioStorageString)
    : null;

  idUsuarioVendedor: string = this.usuarioStorageJson._id;

  idProductoNuevo: string = '';

  producto = {
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    idCategoria: '',
    estado: 'Disponible',
    fechaCreacion: '',
    idUsuarioVendedor: this.idUsuarioVendedor,
  };

  categorias!: any[];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  subirProducto() {
    let d = new Date();

    this.producto.fechaCreacion = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();

    this.api.postProducto(this.producto).subscribe((data) =>{
      this.idProductoNuevo = data._id;
      this.router.navigateByUrl('/productos/' + this.idProductoNuevo)
    });

  }
}
