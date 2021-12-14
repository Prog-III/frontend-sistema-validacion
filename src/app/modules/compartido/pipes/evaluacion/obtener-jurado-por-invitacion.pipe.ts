import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';
import { JuradoService } from '../../../../servicios/parametros/jurado.service';

@Pipe({
  name: 'obtenerJuradoPorInvitacion'
})
export class ObtenerJuradoPorInvitacionPipe implements PipeTransform {
  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService,
    private juradoService: JuradoService
  ) {
    
  }

  async transform(idInvitacion: number): Promise<string> {
    const invitacionEvaluar = await firstValueFrom(this.invitacionEvaluarService.BuscarInvitacionPorId(idInvitacion))
    if (!invitacionEvaluar) return "No existe la invitación"
    
    const juradoInvitado = await firstValueFrom(this.juradoService.BuscarRegistro(invitacionEvaluar.id_jurado!))
    if (!juradoInvitado) return "No existe el jurado"
      
    return juradoInvitado.nombre!;
  }

}
