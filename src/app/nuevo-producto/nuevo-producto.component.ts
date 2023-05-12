import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  usuarioStorageString = localStorage.getItem('usuario');
  usuarioStorageJson = this.usuarioStorageString ? JSON.parse(this.usuarioStorageString) : null;


  idUsuarioVendedor: string = this.usuarioStorageJson._id;



  producto = {
    nombre:'',
    descripcion: '',
    precio: '',
    imagen:'',
    idCategoria:'',
    estado:'Disponible',
    fechaCreacion: Date.now().toLocaleString(),
    idUsuarioVendedor: this.idUsuarioVendedor
  };

  categorias!: any[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  subirProducto(){
    this.api.postProducto(this.producto).subscribe(data => {
      console.log(data);
    })
  }
}
