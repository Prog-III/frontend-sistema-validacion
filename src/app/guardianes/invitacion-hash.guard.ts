import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../servicios/seguridad/token.service';
import { InvitacionEvaluarService } from '../servicios/evaluacion/invitacion-evaluar.service';
import { ToastService } from '../servicios/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class InvitacionHashGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private invitacionEvaluar: InvitacionEvaluarService,
    private router: Router,
    private toastService: ToastService
  ) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const hash = route.params['hash'];

    return new Observable<boolean>(observer => {
      this.tokenService.obtenerTokenTemporal()
      .subscribe(tokenTemporal => {
        const filtro = `"where":{"hash":"${hash}"}`
        this.invitacionEvaluar.GetRecordList(filtro, tokenTemporal)
          .subscribe(invitaciones => {
            if (invitaciones.length !== 1) {
              observer.next(false);
              this.router.navigateByUrl('/seguridad/login');
              this.toastService.openToast({ tipo: 'error', mensaje: 'No existe el hash para la invitación a evaluar' })
            }

            const invitacionEvaluar = invitaciones[0];
            if (invitacionEvaluar.estado_invitacion !== 0) {
              observer.next(false);
              this.router.navigateByUrl('/seguridad/login');
              this.toastService.openToast({ tipo: 'error', mensaje: 'La invitación ya fue respondida' });
            }

            observer.next(true);
          })
      })
    });

  }
  
}
