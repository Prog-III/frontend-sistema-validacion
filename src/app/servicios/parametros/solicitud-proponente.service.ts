import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { TokenModel } from 'src/app/models/compartido/token.model';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudProponenteService {
  private token?: TokenModel;
  private url: string = GeneralData.MS_NEGOCIO_URL;

  private httpOptions = {
    headers: { }
  }

  constructor(
    private http: HttpClient
  ) { 
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')

    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token?.token}`
    });    
  }

  GuardarRegistroSolicitudProponente(idSolicitud:number , idProponente: number) {
    return this.http.post<SolicitudProponenteModel>(`${this.url}/solicitud-proponente`, {
      id_solicitud: idSolicitud,
      id_proponente: idProponente
    }, this.httpOptions);
  }

  ObtenerProponentesPorSolicitud(idSolicitud: number) {
    return this.http.get<SolicitudProponenteModel[]>(`${this.url}/solicitudes/${idSolicitud}/proponentes`, this.httpOptions);
  }

  EliminarSolicitudesProponentes(SolicitudComite: SolicitudProponenteModel) {
    const { id_solicitud, id_proponente } = SolicitudComite; 

    return this.http.delete<SolicitudProponenteModel>(`${this.url}/solicitudes/${id_solicitud}/${id_proponente}`, this.httpOptions);
  }
}