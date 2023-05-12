import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  email: string = '';
  password: string = '';

  loggedIn!: boolean;

  constructor(public router: Router, private api: ApiService) {}

  ngOnInit() {  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.validarSesion();
    }
  });
}

  validarSesion() {
    let usuarioStorageString = localStorage.getItem('usuario');
    let usuarioStorageJson = usuarioStorageString ? JSON.parse(usuarioStorageString) : null;

    if (usuarioStorageJson === '' || usuarioStorageJson === undefined || usuarioStorageJson === null) {
      localStorage.removeItem('usuario');
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  iniciarSesion() {
    localStorage.removeItem('usuario');
    this.api.getUsuarioPorEmail(this.email).subscribe((res) => {
      if (!res) {
        res.status(400).json({ message: 'Usuario no encontrado' });
      } else {
        if (res.email === this.email && this.password === res.password) {
          localStorage.setItem('usuario', JSON.stringify(res));
          this.loggedIn = true;
        }
      }
    });
  }

}
