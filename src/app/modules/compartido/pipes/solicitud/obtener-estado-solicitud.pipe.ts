import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EstadoSolicitudService } from '../../../../servicios/parametros/estado-solicitud.service';

@Pipe({
  name: 'obtenerEstadoSolicitud'
})
export class ObtenerEstadoSolicitudPipe implements PipeTransform {

  constructor(
    private estadoSolicitudService: EstadoSolicitudService
  ) {

  }

  async transform(id?: number): Promise<string> {
    if(id){
      let respuestaEstadoSolicitud = await firstValueFrom(this.estadoSolicitudService.BuscarRegistro(id));

      return respuestaEstadoSolicitud.nombre || "No existe estado de solicitud";
    }
    
    return "No existe estado de solicitud";
  }
}
