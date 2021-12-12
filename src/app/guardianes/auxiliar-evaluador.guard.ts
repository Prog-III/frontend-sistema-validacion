import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../servicios/compartidos/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarEvaluadorGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roles = this.localStorageService.GetRolActivo();
    let permitir = false;

    roles.forEach(role => {
      if (role.nombre == "Auxiliar" || role.nombre == "Administrador" || role.nombre == "Evaluador" ) {
        permitir = true;
      }
    })

    if (permitir) {

      return true;
    } else {
      
      return false;
    }
  }
  
  
}