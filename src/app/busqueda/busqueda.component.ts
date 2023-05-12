import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto.interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {
  categorias!: any[];

  productos:Producto[] = [];

  precio_max = 100000;
  precio_min = 0;
  idCategoria = '';
  estado = 'Disponible';
  textoBusqueda = '';

  constructor(private api: ApiService) {}

  onSearchTextChange() {
    this.searchProducts();
  }

  ngOnInit(): void {
    this.api.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
    this.searchProducts();
  }

  searchProducts() {
    let queryBusqueda = '';

    if (this.textoBusqueda !== undefined && this.textoBusqueda !== "") {
      queryBusqueda = queryBusqueda + `nombre=${this.textoBusqueda}`;
    }

    queryBusqueda = queryBusqueda + `&precio_max=${this.precio_max}&precio_min=${this.precio_min}`;

    if (this.estado !== undefined && this.estado !== "") {
      queryBusqueda = queryBusqueda + `&estado=${this.estado}`;
    }

    if (this.idCategoria !== undefined && this.idCategoria !== "") {
      queryBusqueda = queryBusqueda + `&idCategoria=${this.idCategoria}`;
    }

    this.api.getProductos(queryBusqueda).subscribe((data) => {
      this.productos = data;
    });
  }
}
