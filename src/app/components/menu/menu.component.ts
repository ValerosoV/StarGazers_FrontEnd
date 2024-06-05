import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  rolUsuario = 0;
  nombreUsuario = "";
  apellidoUsuario = "";
  

  constructor(private router: Router) {
    
  }
  ngOnInit() {
    this.rolUsuario = Number(localStorage.getItem('rol'));
    this.nombreUsuario = ""+localStorage.getItem('nombre');
    this.apellidoUsuario = ""+localStorage.getItem('apellido');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToPerfil() {
    this.router.navigate(['/perfil']);
  }

  goToContenidos(){
    this.router.navigate(['/contenidos']);
  }

  goToEventos(){
    this.router.navigate(['/eventos']);
  }
}

