import { Injectable } from '@angular/core';
import { TokenModel } from 'src/app/models/seguridad/token.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralData } from 'src/app/config/general-data';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any
  constructor(
    private http: HttpClient,
  ) { this.token = JSON.parse(localStorage.getItem("session-info") || '{}')}

  validarToken(token: string): Observable<TokenModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
//console.log(token);

    return this.http.post<TokenModel>(`${this.url}/verificar-expiracion-token`, {'token':token, 'correo':''}, httpOptions);

  }

  
}
