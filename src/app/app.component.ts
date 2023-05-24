import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;
  registro: boolean = false;

  visibility: string = '';

  emailSesion: string = '';
  passwordSesion: string = '';

  toastBody: string = '';

  usuario = {
    nombre: '',
    apellidos: '',
    localidad: '',
    telefono: 0,
    email: '',
    password: '',
  };

  constructor(public router: Router, private api: ApiService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.validarSesion();
      }
    });
  }

  validarSesion() {
    let usuarioStorageString = localStorage.getItem('usuario');
    let usuarioStorageJson = usuarioStorageString
      ? JSON.parse(usuarioStorageString)
      : null;

    if (
      usuarioStorageJson === '' ||
      usuarioStorageJson === undefined ||
      usuarioStorageJson === null
    ) {
      localStorage.removeItem('usuario');
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  iniciarSesion() {
    localStorage.removeItem('usuario');

    this.api.getUsuarioPorEmail(this.emailSesion).subscribe(
      (res) => {
        if (res) {
          if (
            res.email === this.emailSesion &&
            this.passwordSesion === res.password
          ) {
            localStorage.setItem('usuario', JSON.stringify(res));
            this.loggedIn = true;
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.mostrarAlerta(
          'show bg-alerta',
          'Comprueba que los campos son correctos'
        );
        setTimeout(() => {
          this.mostrarAlerta('hidden', '');
        }, 4000);
      }
    );
  }

  mostrarAlerta(visibility: string, body: string) {
    this.visibility = visibility;
    this.toastBody = body;
  }

  registrar() {
    this.registro = true;
  }

  volver() {
    this.registro = false;
  }

  registroUsuario() {
    this.emailSesion = this.usuario.email;
    this.passwordSesion = this.usuario.password;

    this.api.postUsuario(this.usuario).subscribe(
      (data) => {
        localStorage.setItem('usuario', JSON.stringify(data));

        this.mostrarAlerta(
          'show bg-exito',
          'Registro con éxito! Iniciando sesión'
        );
        setTimeout(() => {
          this.iniciarSesion();
        }, 3000);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        let textoAlerta = '';

        if (error.error.message.errors?.email !== undefined) {
          textoAlerta = textoAlerta + error.error.message.errors.email.message;
        }

        if (error.error.message.errors?.telefono !== undefined) {
          textoAlerta = textoAlerta +"<p>"+ error.error.message.errors.telefono.message+"</p>";
        }

        if (error.status === 400) {
          if (error.error.message.keyValue) {
            if (error.error.message.keyValue.email) {
              textoAlerta = textoAlerta + "<p>Email está duplicado: " + error.error.message.keyValue.email + "</p>";
            }
            if (error.error.message.keyValue.telefono) {
              textoAlerta = textoAlerta + "<p>Telefono esta duplicado: " + error.error.message.keyValue.telefono + "</p>";
            }
          }
        }

        console.log(error);
        this.mostrarAlerta('show bg-alerta', textoAlerta);
        setTimeout(() => {
          this.mostrarAlerta('hidden', '');
        }, 5000);
      }
    );
  }
}
