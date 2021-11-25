import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ArchivoModel } from 'src/app/models/archivos/archivo.model';


@Injectable({
  providedIn: 'root'
})
export class CargaArchivosService {

  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<ArchivoModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<ArchivoModel[]>(`${this.url}/cargar_archivos_azure`,httpOptions);
  }

  GuardarRegistro(data: ArchivoModel): Observable<ArchivoModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<ArchivoModel>(`${this.url}/cargar_archivos_azure`,{
      ruta: data.ruta
    },httpOptions);
  }

}
