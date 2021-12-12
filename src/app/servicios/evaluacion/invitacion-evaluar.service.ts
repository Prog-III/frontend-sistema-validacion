import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { InvitacionEvaluarModel } from '../../models/evaluacion/invitacion-evaluar.model';
import { RespuestaInvitacionModel } from '../../models/evaluacion/respuesta-invitacion.model';

@Injectable({
  providedIn: 'root'
})
export class InvitacionEvaluarService {

  token: any
  url: string = GeneralData.MS_NEGOCIO_URL;

  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
  }

  GetRecordList(): Observable<InvitacionEvaluarModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<InvitacionEvaluarModel[]>(`${this.url}/invitaciones-evaluar`, httpOptions);
  }

  GuardarRegistro(data: InvitacionEvaluarModel): Observable<InvitacionEvaluarModel> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    const { id_jurado, id_solicitud, fecha_invitacion, estado_invitacion, estado_evaluacion } = data;    
    return this.http.post<InvitacionEvaluarModel>(`${this.url}/invitaciones-evaluar`, {
      id_jurado,
      id_solicitud,
      fecha_invitacion: new Date,
      estado_evaluacion,
      estado_invitacion
    }, httpOptions);
  }

  BuscarRegistrosPorIdJurado(idjurado: number): Observable<InvitacionEvaluarModel[]> { 
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<InvitacionEvaluarModel[]>(`${this.url}/invitaciones-evaluar?filter={
      "where": {"id_jurado": ${idjurado}, "estado_evaluacion": 1}
    }`, httpOptions)
  }

  ActualizarInvitacionPorHash(hash: string, repuestaInvitacion: RespuestaInvitacionModel) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}
    
    return this.http.patch<InvitacionEvaluarModel>(`${this.url}/invitaciones-evaluar/actualizar-estado/${hash}`,
      JSON.stringify(repuestaInvitacion),
      httpOptions
    );
  }
  
  BuscarRegistroPorIdJuradoIdSolicitud(idjurado: number, idsolicitud:number): Observable<InvitacionEvaluarModel[]> { 
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<InvitacionEvaluarModel[]>(`${this.url}/invitaciones-evaluar?filter={
      "where": {"id_jurado": ${idjurado}, "id_solicitud": ${idsolicitud}}
    }`, httpOptions)
  }
}
