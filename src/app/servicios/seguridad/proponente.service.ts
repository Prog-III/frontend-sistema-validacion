import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';


@Injectable({
  providedIn: 'root'
})
export class ProponenteService {

  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<ProponenteModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<ProponenteModel[]>(`${this.url}/proponentes`,httpOptions);
  }

  GuardarRegistro(data: any){
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}` 
    })}
console.log(data);

    return this.http.post<any>(`${this.url}/proponentes`,data,httpOptions);
  }

  BuscarRegistro(id: number): Observable<ProponenteModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<ProponenteModel>(`${this.url}/proponentes/${id}`,httpOptions)
  }

  EditarRegistro(data: ProponenteModel): Observable<ProponenteModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<ProponenteModel>(`${this.url}/proponentes/${data.id}`,{
      id: data.id,
      primer_nombre:data.primer_nombre,
      otros_nombres: data.otros_nombres,
      primer_apellido: data.primer_apellido ,
      segundo_apellido: data.segundo_apellido,
      documento: data.documento,
      email: data.email,
      celular: data.celular,
      image:data.image ,
      image_public_id: data.image_public_id,
      id_tipo_vinculacion: data.id_tipo_vinculacion,
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/proponentes/${id}`,httpOptions);
  }
}
