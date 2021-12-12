import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SolicitudService } from '../../../../servicios/parametros/solicitud.service';

@Pipe({
  name: 'obtenerNombreTrabajo'
})
export class ObtenerNombreTrabajoPipe implements PipeTransform {
  constructor(
    private solicitudService: SolicitudService
  ) { }

  async transform(idSolicitud: number): Promise<string>  {
    const solicitudEncontrada = await firstValueFrom(this.solicitudService.BuscarRegistro(idSolicitud));

    if (solicitudEncontrada.nombre_trabajo) {
      return solicitudEncontrada.nombre_trabajo;
    }
    
    return "No hay registro";
  }

}
