import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  apiUri = '/api';
  getSingleUri = '/api//Usuario/perfiles/:id'
  updateUri = '/api/usuario/editar/:id'; 
  

  constructor(private http: HttpClient) { }

  /*getAllPerfilesData(token: any): Observable<any> {

    return this.http.get(this.apiUri, {
      headers:
      {
        'Content-Type': 'application/json',
      }
    });
  }*/

  getPerfil(id: string): Observable<any> {
    const url = this.getSingleUri.replace(':id', id);
    return this.http.get(this.getSingleUri, {
      headers:
      {
        'Content-Type': 'application/json',
      }
    });
  }

  updatePerfilData(id: string, data: any): Observable<any> {
    const url = this.updateUri.replace(':id', id);
    return this.http.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

  }

}

