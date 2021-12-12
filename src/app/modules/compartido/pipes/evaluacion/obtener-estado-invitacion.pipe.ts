import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerEstadoInvitacion'
})
export class ObtenerEstadoInvitacionPipe implements PipeTransform {

  transform(numeroEstadoInvitacion: number): string {
    switch (numeroEstadoInvitacion) {
      case 0:
        return "Pendiente"
      case 1:
        return "Aceptada"
      case 2:
        return "Rechazada"
      default:
        return "No registra"
    }
  }

}
