import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  apiUri = '/api/publicaciones';

  constructor(private http: HttpClient) { }

  getAllPublicacionesData(token: any): Observable<any> {
    return this.http.get(this.apiUri+"/buscar", {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }

  newPublicacion(token: any, data: any): Observable<any> {
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
}
