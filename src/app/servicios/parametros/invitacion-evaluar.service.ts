import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';

@Injectable({
  providedIn: 'root'
})
export class InvitacionEvaluarService {

  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
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
}
