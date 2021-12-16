import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { CountModel } from 'src/app/models/reportes/count.model';
import { UsuarioModel } from '../../models/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any
  
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(filtro?: string): Observable<UsuarioModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    let urlGet = `${this.url}/usuarios`;

    if (filtro) {
      urlGet = `${this.url}/usuarios?filter={${filtro}}`
    }

    return this.http.get<UsuarioModel[]>(urlGet, httpOptions);
  }

  GuardarRegistro(usuario: UsuarioModel): Observable<UsuarioModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<UsuarioModel>(`${this.url}/usuarios`, JSON.stringify(usuario), httpOptions);
  }

  BuscarRegistro(id?: string): Observable<UsuarioModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<UsuarioModel>(`${this.url}/usuarios/${id}`,httpOptions)
  }

  EditarRegistro(usuario: UsuarioModel): Observable<UsuarioModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<UsuarioModel>(`${this.url}/usuarios/${usuario._id}`, JSON.stringify(usuario), httpOptions);
  }

  EliminarRegistro(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/usuarios/${id}`,httpOptions);
  }

  ObtenerCantidadActivos(): Observable<CountModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    let estado = true
    let urlGet = `${this.url}/usuarios/count?where[estado]=${estado}`
    

    return this.http.get<CountModel>(urlGet,httpOptions);
  }

  ObtenerCantidadInactivos(): Observable<CountModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    let estado = false
    let urlGet = `${this.url}/usuarios/count?where[estado]=${estado}`
    

    return this.http.get<CountModel>(urlGet,httpOptions);
  }  
}