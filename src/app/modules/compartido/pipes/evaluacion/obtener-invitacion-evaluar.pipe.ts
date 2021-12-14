import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';

@Pipe({
  name: 'obtenerInvitacionEvaluar'
})
export class ObtenerInvitacionEvaluarPipe implements PipeTransform {
  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService
  ) {
    
  }

  async transform(idInvitacion: number) {
    const invitacionEvaluar = await firstValueFrom(this.invitacionEvaluarService.BuscarInvitacionPorId(idInvitacion))

    return invitacionEvaluar;
  }

}
