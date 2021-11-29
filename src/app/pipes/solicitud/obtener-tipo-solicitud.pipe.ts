import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TipoSolicitudService } from '../../servicios/parametros/tipo-solicitud.service';

@Pipe({
  name: 'obtenerTipoSolicitud'
})
export class ObtenerTipoSolicitudPipe implements PipeTransform {

  constructor(
    private tipoSolicitudService: TipoSolicitudService
  ) {
    
  }

  async transform(id: number): Promise<string> {
    const tipoSolicitud = await firstValueFrom(this.tipoSolicitudService.BuscarRegistro(id));

    return tipoSolicitud.nombre || "No existe el tipo de solicitud";
  }

}
