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

  getUsuarioPorId(idUsuario:string): Observable<any> {
    return this.httpClient.get<any>(
      this.url + '/usuarios/' + idUsuario
    );
  }

  postUsuario(usuario:any):Observable<any>{
    return this.httpClient.post<any>(
      this.url + '/usuarios',usuario
    );
  }

  getProductosDeUsuarioPorEstado(idUsuario: string, estado: string): Observable<any> {
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

  putProducto(idProducto:any,producto:any):Observable<any>{
    return this.httpClient.put<any>(
      this.url + '/productos/' + idProducto, producto
    );
  }

  deleteProducto(idProducto:string):Observable<any>{
    return this.httpClient.delete<any>(
      this.url + '/productos/' + idProducto
    );
  }

}
