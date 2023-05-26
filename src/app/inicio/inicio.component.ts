import { map } from 'rxjs/operators';
import { Producto } from './../interfaces/producto.interfaces';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  idProducto: string = '';
  textoBusqueda: string = '';

  productosSuggestion: Producto[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {}

  onSearchTextChange() {
    this.searchProducts();
  }

  searchProducts() {
    let queryBusqueda = '';

    if (this.textoBusqueda !== undefined && this.textoBusqueda !== '') {
      queryBusqueda = queryBusqueda + `nombre=${this.textoBusqueda}`;
    }

    this.api.getProductos(queryBusqueda).subscribe((data) => {
      this.productosSuggestion = data.map((producto: { _id: any; nombre: any; }) => ({
        _id: producto._id,
        nombre: producto.nombre
      }));
    });
  }

  redirectProducto(){
    const selectedProduct = this.productosSuggestion.find((producto) => producto.nombre === this.textoBusqueda);

    if (selectedProduct) {
      const searchUrl = '/productos/' + selectedProduct._id;
      window.location.href = searchUrl;
    }
  }

}
