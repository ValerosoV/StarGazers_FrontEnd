import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContenidosService } from 'src/app/services/contenidos.service';

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent {
  contenidoList: any = [];

  constructor(
    private contenidoService: ContenidosService,
    private router:Router 
  ) {

    };

    ngOnInit() {
      this.getAllContenidos();
    }

    getAllContenidos() {
      this.contenidoService.getAllContenidosData(localStorage.getItem('accessToken')).subscribe(
        (data: {}) => {
          this.contenidoList = data;
        }
      );
    }

    verContenido(contenido: any) {
      this.router.navigate(['/contenido', contenido._id]);
    }
}
