import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../servicios/compartidos/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluadorGuard implements CanActivate {
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
      if (role.nombre == "Evaluador" || role.nombre == "Administrador") {
        permitir = true;
      }
    })

    if (permitir) {

      return true;
    } else {
      this.router.navigate(["/home"]);
      return false;
    }
  }
  
}
