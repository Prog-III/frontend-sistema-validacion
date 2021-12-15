import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { UsuarioRolModel } from 'src/app/models/usuario/usuario-rol.model';
import { RolModel } from '../../models/usuario/rol.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any
  
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(idUsuario: string): Observable<RolModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<RolModel[]>(`${this.url}/usuarios/${idUsuario}/roles` ,httpOptions);
  }

  AsociarUsuarioRoles(idUsuario: string, roles: number[]): Observable<boolean>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<boolean>(`${this.url}/asociar-usuario-roles/${idUsuario}`, {
      array_general: roles
    }, httpOptions);
  }

  EliminarRegistro(usuarioRol: UsuarioRolModel): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    const { id_usuario, id_rol } = usuarioRol; 

    return this.http.delete(`${this.url}/usuarios/${id_usuario}/${id_rol}`, httpOptions);
  }
}
