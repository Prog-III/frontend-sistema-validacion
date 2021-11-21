import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCog, faGlobe, faUsers, faPencilAlt, faStickyNote, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DatosSesionModel } from 'src/app/models/seguridad/datos_sesion';
import { SeguridadService } from 'src/app/servicios/compartidos/seguridad.service';
import { LocalStorageService } from '../../../servicios/compartidos/local-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeSession: boolean = false;
  subscription: Subscription = new Subscription();
  
  faCog = faCog;
  faGlobe = faGlobe;
  faUsers = faUsers;
  faPencilAlt = faPencilAlt;
  faStickyNote = faStickyNote;
  faUser = faUser

  constructor(
    private seguridadService: SeguridadService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.subscription = this.seguridadService.GetSessionInfo().subscribe({
      next: (data: DatosSesionModel) => {
        this.activeSession = data.isLoggedIn;
        console.log(this.activeSession);
        
      },
      error: (err: any) => {

      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
