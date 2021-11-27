import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { TokenModel } from 'src/app/models/compartido/token.model';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { SolicitudComiteModel } from 'src/app/models/parametros/solicitud-comite.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudComiteService {
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

  GuardarRegistroSolicitudComite(idSolicitud:number , idComite: number) {
    return this.http.post<SolicitudComiteModel>(`${this.url}/solicitud-comite`, {
      id_solicitud: idSolicitud,
      id_comite: idComite
    }, this.httpOptions);
  }

  ObtenerComitesPorSolicitud(idSolicitud: number) {
    return this.http.get<ComiteModel[]>(`${this.url}/solicitudes/${idSolicitud}/comites`, this.httpOptions);
  }

  EliminarSolicitudesComites(SolicitudComite: SolicitudComiteModel) {
    const { id_solicitud, id_comite } = SolicitudComite; 

    return this.http.delete<SolicitudComiteModel>(`${this.url}/solicitudes/${id_solicitud}/${id_comite}`, this.httpOptions);
  }
}
