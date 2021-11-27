import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<SolicitudModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<SolicitudModel[]>(`${this.url}/solicitudes`,httpOptions);
  }

  GuardarRegistro(data: SolicitudModel): Observable<SolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<SolicitudModel>(`${this.url}/solicitudes`,{
      fecha: data.fecha,
      nombre_trabajo: data.nombre_trabajo,
      archivo: data.archivo,
      descripcion: data.descripcion,
      id_linea_investigacion: data.id_linea_investigacion,
      id_tipo_solicitud: data.id_tipo_solicitud,
      id_modalidad: data.id_modalidad,
      id_estado: data.id_estado
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<SolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<SolicitudModel>(`${this.url}/solicitudes/${id}`,httpOptions)
  }

  EditarRegistro(data: SolicitudModel): Observable<SolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<SolicitudModel>(`${this.url}/solicitudes/${data.id}`,{
      id: data.id,
      fecha: data.fecha,
      nombre_trabajo: data.nombre_trabajo,
      archivo: data.archivo,
      descripcion: data.descripcion,
      id_linea_investigacion: data.id_linea_investigacion,
      id_tipo_solicitud: data.id_tipo_solicitud,
      id_modalidad: data.id_modalidad,
      id_estado: data.id_estado
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/solicitudes/${id}`,httpOptions);
  }
}
