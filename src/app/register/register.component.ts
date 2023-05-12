import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: any = {
    nombre:"",
    apellidos:"",
    localidad:"",
    telefono:"",
    email:"",
    usuario:"",
    contraseña:""
  };

  onSubmit() {
    alert('Inicio de sesión exitoso');
  }
}
