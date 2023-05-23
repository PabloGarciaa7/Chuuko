import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  @Input() loggedIn:boolean = false;
  @Input() registro!:boolean;



  constructor(private api:ApiService) { }

  ngOnInit() {
  }



}
