import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralData } from '../../config/general-data';
import { CredencialesUsuarioModel } from 'src/app/models/seguridad/credenciales-usuario';
import { DatosSesionModel } from '../../models/seguridad/datos_sesion';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  sessionInfoSubject: BehaviorSubject < DatosSesionModel > = new BehaviorSubject<DatosSesionModel>(new DatosSesionModel());//indicamos que sessionInfoSubject es de tipo SessionDataModel
  
    

  url: string = GeneralData.MS_SEGUIRIDAD_URL;

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
      this.VerificarSesionActiva();
  }
 

  VerificarSesionActiva(): boolean {
    let info = this.localStorageService.GetSessionInfo();
    if (info.token) {
      info.isLoggedIn = true;
      this.RefrescarInfoSesion(info);
      return true;
    } else {
      return false;
    }
  }

  RefrescarInfoSesion(data: DatosSesionModel){
    this.sessionInfoSubject.next(data);
  }

  GetSessionInfo(){
    return this.sessionInfoSubject.asObservable();
  }

  Login(data: CredencialesUsuarioModel): Observable < DatosSesionModel > {
    return this.http.post<DatosSesionModel>(`${this.url}/identificar-usuario`, { //aqui tengo acceso al ms de usuarios puerto 3003
      usuario: data.usuario, // el usuario y clave deben llamarse igual que en las credenciales del ms de concesionario usuarios admin
      clave: data.clave
    });
  }

  
}

