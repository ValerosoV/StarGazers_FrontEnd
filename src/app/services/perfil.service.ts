import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  apiUri = '/api/Usuario/perfiles/:id';
  updateUri = '/api/Usuario/editar/:id'; 
  

  constructor(private http: HttpClient) { }

  getPerfilData(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUri}/perfil/${userId}`);
  }

  updatePerfilData(userId: string, perfilData: any): Observable<any> {
    return this.http.put<any>(`${this.updateUri}/perfil/${userId}`, perfilData);
  }
   

}

