import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';

@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudService {

  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<TipoSolicitudModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<TipoSolicitudModel[]>(`${this.url}/tipos-solicitudes`,httpOptions);
  }

  GuardarRegistro(data: TipoSolicitudModel): Observable<TipoSolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<TipoSolicitudModel>(`${this.url}/tipos-solicitudes`,{
      nombre: data.nombre,
      formato: data.formato
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<TipoSolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<TipoSolicitudModel>(`${this.url}/tipos-solicitudes/${id}`,httpOptions)
  }

  EditarRegistro(data: TipoSolicitudModel): Observable<TipoSolicitudModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<TipoSolicitudModel>(`${this.url}/tipos-solicitudes/${data.id}`,{
      id: data.id,
      nombre: data.nombre,
      formato: data.formato
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/tipos-solicitudes/${id}`,httpOptions);
  }
}
