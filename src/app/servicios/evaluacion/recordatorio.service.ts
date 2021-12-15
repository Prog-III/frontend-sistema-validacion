import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralData } from 'src/app/config/general-data';
import { RecordatorioModel } from '../../models/evaluacion/recordatorio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {

  token: any
  url: string = GeneralData.MS_NEGOCIO_URL;

  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}');
  }

  GetRecordList(filtro?: string): Observable<RecordatorioModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token.token}`
      })
    }

    let urlEndpoint = `${this.url}/recordatorios`;
    if (filtro) {
      urlEndpoint = `${this.url}/recordatorios?filter={${filtro}}`
    }

    return this.http.get<RecordatorioModel[]>(urlEndpoint, httpOptions);
  }

  GuardarRegistro(data: RecordatorioModel): Observable<RecordatorioModel> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    const { id_invitacion_evaluar, fecha, hora, tipo_recordatorio, descripcion } = data;
    return this.http.post<RecordatorioModel>(`${this.url}/recordatorios`, {
      id_invitacion_evaluar,
      fecha,
      hora,
      tipo_recordatorio,
      descripcion
    }, httpOptions);
  }
}
