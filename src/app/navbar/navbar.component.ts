import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  nombreUsuario:string = "";


  constructor(private api: ApiService){}

  ngOnInit(): void {
    let usuarioString = localStorage.getItem('usuario');
    let usuarioJson = usuarioString ? JSON.parse(usuarioString) : null;

    this.nombreUsuario = usuarioJson.nombre;
  }



}
