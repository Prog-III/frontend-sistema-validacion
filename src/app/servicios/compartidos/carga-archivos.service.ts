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

  GetRecordList(id:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<any>(`${this.url}/descargar_archivos_azure/${id}`,httpOptions);
  }

  GuardarRegistro(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}` 
    })}

const formData2 = new FormData();
    formData2.append('file', formData);
 
    
    return this.http.post<any>(`${this.url}/cargar_archivos_azure`,
      formData2
    ,httpOptions);
  }

}
