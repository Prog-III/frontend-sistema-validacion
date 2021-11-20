import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estadosolicitud.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudService {
  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<EstadoSolicitudModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<EstadoSolicitudModel[]>(`${this.url}/estado-solicitudes`,httpOptions);
  }

  GuardarRegistro(data: EstadoSolicitudModel): Observable<EstadoSolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<EstadoSolicitudModel>(`${this.url}/estado-solicitudes`,{
      nombre: data.nombre
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<EstadoSolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<EstadoSolicitudModel>(`${this.url}/estado-solicitudes/${id}`,httpOptions)
  }

  EditarRegistro(data: EstadoSolicitudModel): Observable<EstadoSolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<EstadoSolicitudModel>(`${this.url}/estado-solicitudes/${data.id}`,{
      id: data.id,
      nombre: data.nombre
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/estado-solicitudes/${id}`,httpOptions);
  }
}