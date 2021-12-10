import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCog, faGlobe, faUsers, faPencilAlt, faStickyNote, faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { DatosSesionModel } from 'src/app/models/seguridad/datos_sesion';
import { TokenModel } from 'src/app/models/seguridad/token.model';
import { SeguridadService } from 'src/app/servicios/compartidos/seguridad.service';
import { InvitacionEvaluarService } from 'src/app/servicios/parametros/invitacion-evaluar.service';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';
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
  faUser = faUser;
  idusuario: string = "";
  emailusuario: string = "";
  idjurado: number = 0;
  

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService,
    private service: JuradoService,
    private serviceInvitacionEvaluar: InvitacionEvaluarService
  ) { }
  
  ngOnInit(): void {
    const seguridadSubscription = this.seguridadService.GetSessionInfo().subscribe({
      next: (data: DatosSesionModel) => {
        this.activeSession = data.isLoggedIn;
      },
      error: (err: any) => {
        
      }
    });

    this.subscription.add(seguridadSubscription);

    this.IdJurado();
      
  }

  IdJurado(){
    let token = JSON.parse(localStorage.getItem("session-info") || '{}')
    this.ObjetoToken(token.token).subscribe({
      next: (data: TokenModel) => { 
        if(data.data?.id && data.data?.correo) {
          this.idusuario = data.data?.id   
          this.emailusuario = data.data?.correo
        }
        this.service.BuscarRegistrosPorEmail(this.emailusuario).subscribe({
          next: (data: JuradoModel[]) => {  
            
            if(data[0].id) this.idjurado = data[0].id
            
          },
          error: (err:any)=>{
            
          }
        });
      },
        error: (err:any)=>{
          console.log("error");
          
        }
      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ObjetoToken(token: string): Observable<TokenModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    })}

    return this.http.post<TokenModel>(`http://localhost:3002/verificar-token`, JSON.stringify(token) ,httpOptions);
    
  }
}
