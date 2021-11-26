import { Injectable } from '@angular/core';
import { TokenModel } from 'src/app/models/compartido/token.model';
import { LineaInvestigacionModel } from '../../models/parametros/linea_investigacion.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JuradoLineaInvestigacionModel } from '../../models/parametros/jurado-linea-investigacion.model';
import { GeneralData } from 'src/app/config/general-data';

@Injectable({
  providedIn: 'root'
})
export class JuradoLineaInvestigacionService {
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

  GuardarRegistroLineasInvestigacionJurado(lineasInvestigacionIds: number[], idJurado: number) {
    return this.http.post<JuradoLineaInvestigacionModel>(`${this.url}/asociar-jurado-lineas-investigacion/${idJurado}`, {
      array_general: lineasInvestigacionIds
    }, this.httpOptions);
  }

  ObtenerLineasInvestigacionPorJurado(idJurado: number) {
    return this.http.get<LineaInvestigacionModel[]>(`${this.url}/jurados/${idJurado}/linea-investigacions`, this.httpOptions);
  }

  EliminarJuradosLineasInvestigacion(juradoLineaInvestigacion: JuradoLineaInvestigacionModel) {
    const { id_jurado, id_linea_investigacion } = juradoLineaInvestigacion; 

    return this.http.delete<JuradoLineaInvestigacionModel>(`${this.url}/jurados/${id_jurado}/${id_linea_investigacion}`, this.httpOptions);
  }
}
