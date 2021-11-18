import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ComiteModel } from 'src/app/models/parametros/comite.model';

@Injectable({
  providedIn: 'root'
})
export class ComiteService {
  url: string = GeneralData.MS_NEGOCIO_URL;
  constructor(
    private http: HttpClient
  ) {
   }

  GetRecordList(): Observable<ComiteModel[]>{
    let token = JSON.parse(localStorage.getItem("session-info") || '{}')
    
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}` 
    })}

    return this.http.get<ComiteModel[]>(`${this.url}/comites`,httpOptions);
  }

  GuardarRegistro(data: ComiteModel): Observable<ComiteModel>{
    let token = JSON.parse(localStorage.getItem("session-info") || '{}')
    
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}` 
    })}

    return this.http.post<ComiteModel>(`${this.url}/comites`,{
      nombre: data.nombre
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<ComiteModel>{
    let token = JSON.parse(localStorage.getItem("session-info") || '{}')
    
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}` 
    })}

    return this.http.get<ComiteModel>(`${this.url}/comites/${id}`,httpOptions)
  }

  EditarRegistro(data: ComiteModel): Observable<ComiteModel>{
    let token = JSON.parse(localStorage.getItem("session-info") || '{}')
    
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}` 
    })}

    return this.http.put<ComiteModel>(`${this.url}/comites/${data.id}`,{
      id: data.id,
      nombre: data.nombre
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    let token = JSON.parse(localStorage.getItem("session-info") || '{}')
    
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}` 
    })}

    return this.http.delete(`${this.url}/comites/${id}`,httpOptions);
  }
}
