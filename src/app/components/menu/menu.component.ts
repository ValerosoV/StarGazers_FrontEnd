import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = 'Zoológico';
  user = 'Usuario';
  rolUsuario = 0;

  ngOnInit() {
    this.rolUsuario = Number(localStorage.getItem('rol'));
  }
}

