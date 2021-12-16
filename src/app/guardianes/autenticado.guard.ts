import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/seguridad/token.model';
import { LocalStorageService } from '../servicios/compartidos/local-storage.service';
import { TokenService } from '../servicios/seguridad/token.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient,
    private serviceToken: TokenService,
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = this.localStorageService.GetTokenReal();

    if (token == "") {
      this.router.navigate(["/seguridad/login"]);
      return false;
    } else {
      
     // console.log(token);

      this.serviceToken.validarToken(token).subscribe(
        (data) => {
   //       console.log(data);

          return true;

        },
        (err) => {
          this.localStorageService.RemoverDatosSesion();
          this.router.navigate(["/seguridad/login"]);
          return false;
        }
      )
      return true;
    }
  }

}
