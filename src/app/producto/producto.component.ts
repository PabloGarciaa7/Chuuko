import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  idProducto: string = '';

  productoActual = {
    nombre: '',
    precio: 0,
    imagen: '',
    descripcion: '',
    idCategoria: ''
  };

  productoReserva = {
    estado: 'Reservado',
    idUsuarioComprador: {},
  };

  d = new Date();

  productoComprado = {
    estado: 'Comprado',
    fechaCompra: this.d.getDate()  + "-" + (this.d.getMonth()+1) + "-" + this.d.getFullYear() + " " +
    this.d.getHours() + ":" + this.d.getMinutes()
  };

  productoRechazado = {
    estado: 'Disponible',
    idUsuarioComprador: undefined,
  };

  idUsuarioVendedor: string = '';
  fechaCreacion: string = '';
  fechaCompra: string = '';
  estado: string = '';

  nombreUsuarioVendedor: string = '';
  nombreUsuarioComprador: string = '';
  apellidosUsuarioComprador: string = '';

  idUsuario!: string;
  opcionBoton: string = '';

  categorias!: any[];

  toastClass:string = '';
  toastBody:string = '';

  constructor(private route: ActivatedRoute, private api: ApiService,private router:Router) {}

  ngOnInit() {
    let usuarioString = localStorage.getItem('usuario');
    let usuarioJson = usuarioString ? JSON.parse(usuarioString) : null;

    this.idUsuario = usuarioJson._id;
    this.productoReserva.idUsuarioComprador = usuarioJson;

    this.route.params.subscribe((params) => {
      const idProducto = params['id'];
      this.api.getProductoPorId(idProducto).subscribe((res) => {
        this.productoActual.nombre = res.nombre;
        this.productoActual.precio = res.precio;
        this.productoActual.imagen = res.imagen;
        this.productoActual.descripcion = res.descripcion;
        this.productoActual.idCategoria = res.idCategoria._id;

        this.idProducto = res._id;
        this.idUsuarioVendedor = res.idUsuarioVendedor?._id;
        this.fechaCreacion = res.fechaCreacion;
        this.nombreUsuarioVendedor = res.idUsuarioVendedor.nombre;
        this.nombreUsuarioComprador = res.idUsuarioComprador?.nombre;
        this.apellidosUsuarioComprador = res.idUsuarioComprador?.apellidos;

        this.estado = res.estado;
        this.fechaCompra = res.fechaCompra;
        this.comprobarProducto();
      });
    });

    this.api.getCategorias().subscribe((data) => {
      this.categorias = data;
    });

  }

  mostrarAlerta(visibility:string,body:string){
    this.toastClass = visibility;
    this.toastBody = body;
  }

  comprar() {
    this.api
      .putProducto(this.idProducto, this.productoReserva)
      .subscribe((data) => {
        console.log(data)
        setTimeout(() => {
          this.router.navigateByUrl('/compra-realizada');
        }, 2000)
      });

  }

  editar() {
    this.api.putProducto(this.idProducto, this.productoActual)
      .subscribe((data) => {
        this.mostrarAlerta('texto-reserva mt-3 show','Se ha editado correctamente');
        setTimeout(() => {
          location.reload();
        }, 4000)
      });
  }

  vender() {
    this.api.putProducto(this.idProducto, this.productoComprado)
      .subscribe((data) => {
        console.log(data)
        this.mostrarAlerta('texto-venta mt-3 show','¡Producto vendido!');
        setTimeout(() => {
          this.router.navigateByUrl('/mi-usuario');
        }, 4000)
      });
  }

  borrar(){
    this.api.deleteProducto(this.idProducto).subscribe((data) =>{
      console.log(data)
      this.mostrarAlerta('texto-eliminado mt-3 show','¡Producto eliminado!');
      setTimeout(() => {
        this.router.navigateByUrl('/mi-usuario');
      }, 4000)
    });
  }

  rechazarVenta() {
    this.api.putProducto(this.idProducto, this.productoRechazado).subscribe((data) => {
      console.log(data)
      this.mostrarAlerta('texto-rechazo mt-3 show','Se ha rechazado la compra! Volvera a estar disponible');
      setTimeout(() => {
        location.reload();
      }, 4000)
    });
  }

  comprobarProducto() {
    if (this.estado === 'Disponible') {
      if (this.idUsuario === this.idUsuarioVendedor) {
        this.opcionBoton = 'opcion1';
      }
    } else if (this.estado === 'Reservado') {
      if (this.idUsuario === this.idUsuarioVendedor) {
        this.opcionBoton = 'opcion2';
      } else {
        this.opcionBoton = 'opcion4';
      }
    } else if (this.estado === 'Comprado') {
      this.opcionBoton = 'opcion3';
    }
  }
}
