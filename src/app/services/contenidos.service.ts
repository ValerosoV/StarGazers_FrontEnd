import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContenidosService {
  apiUrl = '/api/contenido';

  constructor(
    private http: HttpClient
  ) { }

  getAllContenidosData(token: any): Observable<any> {
    return this.http.get(
      this.apiUrl +'/buscar', 
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
        }
      }
    );
  }

  getSingleContenido(token: any, id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + '/buscar/' + id,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

  newContenido(token: any, data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl +'/crear',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }

  updateContenido(token: any, id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUrl + '/modificar/' + id,
      data,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }


  deleteContenido(token: any, id: any) {
    return this.http.delete<any>(
      this.apiUrl + "/eliminar/" + id,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }
  /**/
}
