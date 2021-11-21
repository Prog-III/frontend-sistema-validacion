import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { faCog, faGlobe, faUsers, faPencilAlt, faStickyNote, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DatosSesionModel } from 'src/app/models/seguridad/datos_sesion';
import { SeguridadService } from 'src/app/servicios/compartidos/seguridad.service';
import { LocalStorageService } from '../../../servicios/compartidos/local-storage.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/servicios/compartidos/modal.service';
import { ModalData } from '../../../models/compartido/modal-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('modalContainer', { static: true, read: ViewContainerRef }) modalContainer!: ViewContainerRef;

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
    private modalService: ModalService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    console.log(this.modalContainer);
    
    this.subscription = this.seguridadService.GetSessionInfo().subscribe({
      next: (data: DatosSesionModel) => {
        this.activeSession = data.isLoggedIn;
        console.log(this.activeSession);
        
      },
      error: (err: any) => {

      }
    });
  }

  abrirModalReportes() {
    this.abrirModal({ header: 'Reportes', body: '455' })
  }

  abrirModalUsuarios() {
    this.abrirModal({ header: 'Usuarios', body: '455', esModalConfirmacion: true })
  }

  abrirModal(data: ModalData) {
    this.modalService.openModal(this.modalContainer, data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
