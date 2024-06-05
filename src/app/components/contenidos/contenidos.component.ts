import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { Router } from '@angular/router';
import { ContenidosService } from 'src/app/services/contenidos.service';
=======
import { Observable } from 'rxjs';
>>>>>>> Stashed changes

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent {
<<<<<<< Updated upstream
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
=======
  apiUrl = '/api/contenido';

  constructor(private http: HttpClient) { }

  getAllContenidosData(token: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accessToken': `${token}`
      })
    });
  }
>>>>>>> Stashed changes
}
