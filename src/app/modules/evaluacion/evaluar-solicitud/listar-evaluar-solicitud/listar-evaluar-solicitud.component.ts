import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { TokenModel } from 'src/app/models/seguridad/token.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';
import { faArrowLeft, faUniversity, faPaste } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitacionEvaluarService } from 'src/app/servicios/evaluacion/invitacion-evaluar.service';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';

@Component({
  selector: 'app-listar-evaluar-solicitud',
  templateUrl: './listar-evaluar-solicitud.component.html',
  styleUrls: ['./listar-evaluar-solicitud.component.css']
})
export class ListarEvaluarSolicitudComponent implements OnInit {

  emailusuario: string = "";
  idjurado: number = 0;
  invitaciones: InvitacionEvaluarModel[] = []
  solicitudes: SolicitudModel[] = []

  faArrowLeft = faArrowLeft;
  faUniversity = faUniversity;
  faPaste = faPaste;

  terminoBusqueda?: string;

  constructor(
    private http: HttpClient,
    private serviceInvitacionEvaluar: InvitacionEvaluarService,
    private serviceSolicitud: SolicitudService,
    private servicioJurado: JuradoService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.obtenerSolicitudes()
    this.verificarAcceso()

  }

  obtenerSolicitudes() {
    let id = parseInt(this.route.snapshot.params["id"])
    this.idjurado = id
    this.serviceInvitacionEvaluar.BuscarRegistrosPorIdJurado(id).subscribe({
      next: (data: InvitacionEvaluarModel[]) => {
        this.invitaciones = data
        for (let i = 0; i < this.invitaciones.length; i++) {
          this.serviceSolicitud.BuscarRegistro(this.invitaciones[i].id_solicitud).subscribe({
            next: (data: SolicitudModel) => {
              if (data)
                this.solicitudes.push(data)

            },
            error: (err: any) => {

            }
          })

        }
      },
      error: (err: any) => {

      }
    });

  }

  verificarAcceso() {
    let id = parseInt(this.route.snapshot.params["id"]);
    //hacer verificacion al token 
    this.servicioJurado.validarJuradoPorEmail(id).subscribe(data => {
      if (data) {
      } else {
        let roles = this.localStorageService.GetRolActivo();
        let permitir = false;

        roles.forEach(role => {
          if (role.nombre == "Administrador") {
            permitir = true;
          }
        })
        if(permitir){
          
        }else{
          this.router.navigate(["/home"]);
        }
        
      }
    })

  }

  ObjetoToken(token: string): Observable<TokenModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<TokenModel>(`http://localhost:3002/verificar-token`, JSON.stringify(token), httpOptions);

  }

  descarga(id: any) {

    let url = 'http://localhost:3000/descargar_archivos_azure/' + id;

    window.open(url);

  }
}


