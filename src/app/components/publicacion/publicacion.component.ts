import { Component } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent {
  publicacionesList: any = [];
  nombreUsuario = "";
  apellidoUsuario = "";
  rolUsuario = 0;

  constructor(private publicacionService: PublicacionService) {
  }
  
  ngOnInit() {
    this.getAllPublicaciones();
    this.nombreUsuario = ""+localStorage.getItem('nombre');
    this.apellidoUsuario = ""+localStorage.getItem('apellido');
    this.rolUsuario = Number(localStorage.getItem('rol'));  
  }

  getAllPublicaciones() {
    this.publicacionService.getAllPublicacionesData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.publicacionesList = data
      }
    );
  }
}
