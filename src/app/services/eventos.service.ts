import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  //parametros:
  apiUri = '/api/evento';

  constructor(
    private http: HttpClient
  ) { } //constructor
  
  getAllEventosData(token: any): Observable<any> {
    return this.http.get(this.apiUri+"/buscar", {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }

  getSingleEvento(token: any, id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUri + '/buscar/' + id,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

  newEvento(token: any, data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri+"/crear",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }

  updateEvento(token: any, id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + '/modificar/' + id,
      data,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

  deleteEvento(token: any, id: any) {
    return this.http.delete<any>(
      this.apiUri + "/eliminar/" + id,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

  getEventosPorIntereses(token: any, data: any): Observable<any> {
    console.log(data);
    
    return this.http.get(
      this.apiUri+"/SegunIntereses/"+data, {headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }
  /**/
}
