import { Injectable } from '@angular/core';
import { DatosSesionModel } from 'src/app/models/seguridad/datos_sesion';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  GuardarDatosSesion(data: DatosSesionModel): boolean {
    let datos_actuales = localStorage.getItem("session-info");
    if (datos_actuales) {
      return false;
    } else {
      let datosSesionString = JSON.stringify(data);
      localStorage.setItem("session-info", datosSesionString);
      return true;
    }
  }

  RemoverDatosSesion(): boolean{
    let datos_actuales = localStorage.getItem("session-info");
    if (datos_actuales) {
      localStorage.removeItem("session-info");
      return true;
    }else{
      return false;
    }
  }

  GetToken(): string{
    let datos_actuales = localStorage.getItem("session-info");
    if (datos_actuales) {
      let datosSesionJson = JSON.parse(datos_actuales);
      return datosSesionJson.tk;
    }else{
      return "";
    }
  }

  GetSessionInfo(): DatosSesionModel{
    let datos_actuales = localStorage.getItem("session-info");
    if (datos_actuales) {
      let datosSesionJson = JSON.parse(datos_actuales);
      return datosSesionJson;
    }else{
      return new DatosSesionModel();
    }
  }
}
