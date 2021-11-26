import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosSesionModel } from 'src/app/models/seguridad/datos_sesion';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { SeguridadService } from 'src/app/servicios/compartidos/seguridad.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private securityService: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.localStorageService.RemoverDatosSesion();
    this.securityService.RefrescarInfoSesion(new DatosSesionModel());
    this.router.navigate(["/seguridad/login"]);
  }
}