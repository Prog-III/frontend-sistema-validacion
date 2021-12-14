import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { InvitacionEvaluarService } from 'src/app/servicios/evaluacion/invitacion-evaluar.service';
import { SolicitudService } from '../../../../servicios/parametros/solicitud.service';

@Pipe({
  name: 'obtenerTrabajoPorInvitacion'
})
export class ObtenerTrabajoPorInvitacionPipe implements PipeTransform {
  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService,
    private solicitudService: SolicitudService
  ) {
    
  }

  async transform(idInvitacion: number) {
    const invitacionEvaluar = await firstValueFrom(this.invitacionEvaluarService.BuscarInvitacionPorId(idInvitacion))
    if (!invitacionEvaluar) return "No existe la invitación"
    
    const solicitud = await firstValueFrom(this.solicitudService.BuscarRegistro(invitacionEvaluar.id_solicitud!))
    if (!solicitud) return "No existe la solicitud"
      
    return solicitud.nombre_trabajo!;
  }

}
