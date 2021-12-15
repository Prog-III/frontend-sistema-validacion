import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ResultadoEvaluacionModel } from 'src/app/models/evaluacion/resultado-evaluacion.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadoEvaluacionService {

  token: any
  url: string = GeneralData.MS_NEGOCIO_URL;
  
  constructor(
    private http: HttpClient
  ) { 
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
  }

  GuardarRegistro(data: ResultadoEvaluacionModel): Observable<ResultadoEvaluacionModel> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    const { descripcion, fecha, formato_diligenciado, id_invitacion_evaluar} = data;    
    return this.http.post<ResultadoEvaluacionModel>(`${this.url}/resultados-evaluaciones`, {
      descripcion,
      fecha,
      formato_diligenciado,
      id_invitacion_evaluar
    }, httpOptions);
  }

  BuscarRegistro(idResultadoEvaluacion: number) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    return this.http.get<ResultadoEvaluacionModel>(`${this.url}/resultados-evaluaciones/${idResultadoEvaluacion}`, httpOptions);
  } 

  BuscarRegistroPorIdInvitacion(idInvitacionEvaluar: number): Observable<ResultadoEvaluacionModel[]> { 
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<ResultadoEvaluacionModel[]>(`${this.url}/resultados-evaluaciones?filter={
      "where": {"id_invitacion_evaluar":${idInvitacionEvaluar}}
    }`, httpOptions)
  }

  EliminarRegistro(idResultadoEvaluacion: number) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    return this.http.delete<ResultadoEvaluacionService>(`${this.url}/resultados-evaluaciones/${idResultadoEvaluacion}`, httpOptions);
  }
}
