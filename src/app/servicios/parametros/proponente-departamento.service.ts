import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { TokenModel } from 'src/app/models/compartido/token.model';
import { ProponenteDepartamentoModel } from 'src/app/models/parametros/proponente-departamento.model';

@Injectable({
  providedIn: 'root'
})
export class ProponenteDepartamentoService {
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

  GuardarRegistroDepartamentoProponente(idDepartamento:number , idProponente: number) {
    return this.http.post<ProponenteDepartamentoModel>(`${this.url}/departamento-proponente`, {
      id_departamento: idDepartamento,
      id_proponente: idProponente
    }, this.httpOptions);
  }

  ObtenerProponentesPorDepartamento(idDepartamento: number) {
    return this.http.get<ProponenteDepartamentoModel[]>(`${this.url}/departamentos/${idDepartamento}/proponentes`, this.httpOptions);
  }

  EliminarDepartamentosProponentes(DepartamentoProponente: ProponenteDepartamentoModel) {
    const { id_departamento, id_proponente } = DepartamentoProponente; 

    return this.http.delete<ProponenteDepartamentoModel>(`${this.url}/departamentos/${id_departamento}/${id_proponente}`, this.httpOptions);
  }
}
