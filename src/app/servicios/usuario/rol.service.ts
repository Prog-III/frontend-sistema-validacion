import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { RolModel } from '../../models/usuario/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any
  
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(filtro?: string): Observable<RolModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    let urlGet = `${this.url}/roles`;

    if (filtro) {
      urlGet = `${this.url}/roles?filter={${filtro}}`
    }

    return this.http.get<RolModel[]>(urlGet,httpOptions);
  }

  GuardarRegistro(rol: RolModel): Observable<RolModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<RolModel>(`${this.url}/roles`, JSON.stringify(rol), httpOptions);
  }

  BuscarRegistro(id?: number ): Observable<RolModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<RolModel>(`${this.url}/roles/${id}`,httpOptions)
  }

  EditarRegistro(rol: RolModel): Observable<RolModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<RolModel>(`${this.url}/roles/${rol._id}`, JSON.stringify(rol), httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/roles/${id}`,httpOptions);
  }
}
