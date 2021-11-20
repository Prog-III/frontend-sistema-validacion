import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correo-notificacion.model';

@Injectable({
  providedIn: 'root'
})
export class CorreoNotificacionService {
  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<CorreoNotificacionModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<CorreoNotificacionModel[]>(`${this.url}/correos-notificaciones`,httpOptions);
  }

  GuardarRegistro(data: CorreoNotificacionModel): Observable<CorreoNotificacionModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<CorreoNotificacionModel>(`${this.url}/correos-notificaciones`,{
      nombre: data.nombre,
      correo: data.correo,
      estado: data.estado
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<CorreoNotificacionModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<CorreoNotificacionModel>(`${this.url}/correos-notificaciones/${id}`,httpOptions)
  }

  EditarRegistro(data: CorreoNotificacionModel): Observable<CorreoNotificacionModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<CorreoNotificacionModel>(`${this.url}/correos-notificaciones/${data.id}`,{
      id: data.id,
      nombre: data.nombre,
      correo: data.correo,
      estado: data.estado
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/correos-notificaciones/${id}`,httpOptions);
  }
}