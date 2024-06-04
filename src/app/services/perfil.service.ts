import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = '/api/usuario';

  constructor(private http: HttpClient) { }

  getPerfil(userId: string): Observable<any> {
    const url = `${this.apiUrl}/perfiles/${userId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(url);
    console.log(headers);
    return this.http.get(url, { headers });
  }

  updatePerfil(userId: string, token: any, data: any): Observable<any> { //la data podria o deberia ser User en vez de any?
    const url = `${this.apiUrl}/perfiles/${userId}`;
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, data, {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }

  subirFotoPerfil(userId: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${userId}/foto`;
    return this.http.post(url, formData);
  }
}