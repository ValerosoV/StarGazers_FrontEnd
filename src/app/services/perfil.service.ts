import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = '/api/usuarios';

  constructor(private http: HttpClient) { }

  getPerfil(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(url, { headers });
  }

  updatePerfil(userId: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, data, { headers });
  }

  subirFotoPerfil(userId: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${userId}/foto`;
    return this.http.post(url, formData);
  }
}