import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import filterAsync from 'node-filter-async';
import { GeneralData } from 'src/app/config/general-data';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';

@Injectable({
  providedIn: 'root'
})
export class JuradoService {

  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any;

  

  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<JuradoModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<JuradoModel[]>(`${this.url}/jurados`,httpOptions);
  }

  GuardarRegistro(data: JuradoModel): Observable<JuradoModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<JuradoModel>(`${this.url}/jurados`,{
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      entidad: data.entidad
    },httpOptions);
  }

  /**
   * 
   * @param data 
   */
  async GuardarVariosRegistros(data: JuradoModel[]): Promise<Observable<JuradoModel[]>> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    const juradosValidos = data.filter(jurado => (jurado.email && jurado.nombre && jurado.email))
    const juradosFiltrados = await filterAsync(juradosValidos, async (jurado: JuradoModel) => {
      const juradoEnDb = await firstValueFrom(this.BuscarRegistrosPorEmail(jurado.email!))

      return juradoEnDb.length === 0
    });

    return this.http.post<JuradoModel[]>(`${this.url}/jurados-arreglo`, juradosFiltrados, httpOptions)
  }

  BuscarRegistro(id: number): Observable<JuradoModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<JuradoModel>(`${this.url}/jurados/${id}`, httpOptions)
  }

  BuscarRegistrosPorEmail(email: string): Observable<JuradoModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<JuradoModel[]>(`${this.url}/jurados?filter={
      "where": {"email": "${email}"}
    }`, httpOptions)
  }

  EditarRegistro(data: JuradoModel): Observable<JuradoModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<JuradoModel>(`${this.url}/jurados/${data.id}`,{
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      entidad: data.entidad
    }, httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/jurados/${id}`,httpOptions);
  }
}
