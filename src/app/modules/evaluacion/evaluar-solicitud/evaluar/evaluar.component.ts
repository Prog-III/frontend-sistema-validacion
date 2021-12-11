import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudComiteService } from 'src/app/servicios/parametros/solicitud-comite.service';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';
import { faArrowLeft, faUniversity, faPaste } from '@fortawesome/free-solid-svg-icons';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css']
})
export class EvaluarComponent implements OnInit {

  idjurado = parseInt(this.route.snapshot.params["idjurado"])
  idsolicitud = parseInt(this.route.snapshot.params["idsolicitud"])
  solicitud: SolicitudModel = new SolicitudModel; 
  comitesSolicitud: ComiteModel[] = []
  faArrowLeft = faArrowLeft
  tiposolicitud: TipoSolicitudModel = new TipoSolicitudModel;

  constructor(
    private serviceSolicitud: SolicitudService,
    private servicecomiteSolicitud: SolicitudComiteService,
    private servicetipoSolicitud: TipoSolicitudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtenerSolicitud()
    this.obtenerComites()
  }


  obtenerSolicitud(){
    this.serviceSolicitud.BuscarRegistro(this.idsolicitud).subscribe({
      next: (data: SolicitudModel) => {
        if(data)
        this.solicitud = data
        this.servicetipoSolicitud.BuscarRegistro(this.solicitud.id_tipo_solicitud).subscribe({
          next: (data: TipoSolicitudModel) => {
            if(data)
            this.tiposolicitud = data
            console.log(this.tiposolicitud);
            
          },
          error: (err: any) => {
    
          }
        })
      },
      error: (err: any) => {

      }
    })
  }

  obtenerComites(){
    this.servicecomiteSolicitud.ObtenerComitesPorSolicitud(this.idsolicitud).subscribe({
      next: (data: ComiteModel[]) => {
        if(data)
        this.comitesSolicitud = data
        
      },
      error: (err: any) => {

      }
    })
  }

 

  descarga(id: any) {

    let url = 'http://localhost:3000/descargar_archivos_azure/' + id;

    window.open(url);

  }
}
