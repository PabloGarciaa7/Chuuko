import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  url: string = 'https://chuuko.herokuapp.com/api';

  constructor(private httpClient: HttpClient) {}

  getUsuarioPorEmail(email: string): Observable<any> {
    return this.httpClient.get<any>(
      this.url + '/usuarios/usuario?email=' + email
    );
  }

  getProductosDeUsuarioPorEstado(idUsuario: string,estado: string): Observable<any> {
    return this.httpClient.get<any>(
      this.url + '/usuarios/' + idUsuario + '/productos?estado=' + estado
    );
  }

  getProductoPorId(idProducto:string):Observable<any>{
    return this.httpClient.get<any>(
      this.url + '/productos/' + idProducto
    );
  }

  getCategorias():Observable<any>{
    return this.httpClient.get<any>(
      this.url + '/categorias'
    );
  }

  postProducto(producto:any):Observable<any>{
    return this.httpClient.post<any>(
      this.url + '/productos', producto
    );
  }

  getProductos(queryBusqueda:string):Observable<any>{
    return this.httpClient.get<any>(
      this.url + '/productos?' + queryBusqueda
    );
  }

}
