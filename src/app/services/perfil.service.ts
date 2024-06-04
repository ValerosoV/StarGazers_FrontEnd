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

  getAllPerfilesData(token: any): Observable<any> {
    return this.http.get(this.apiUrl+"/perfiles", {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }
  getPerfil(userId: string): Observable<any> {
    const url = `${this.apiUrl}/perfiles/${userId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(url);
    console.log(headers);
    return this.http.get(url, { headers });
  }

  /*No hay create Perfil, porque de eso se encarga el servicio de authentication con su metodo para Register*/

  updatePerfil(userId: string, token: any, data: any): Observable<any> { //la data podria o deberia ser User en vez de any?
    console.log(data);
    const url = `${this.apiUrl}/editar/${userId}`;
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, data, { headers: 
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }});
  }

  deleteEvento(token: any, id: any) {
    return this.http.delete<any>(
      this.apiUrl + "/borrar/" + id,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

  subirFotoPerfil(userId: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${userId}/foto`;
    return this.http.post(url, formData);
  }

  getIntereses(userId: string): Observable<any> {
    const url = `${this.apiUrl}/perfiles/interes/${userId}`;
    return this.http.get(url);
  }

}