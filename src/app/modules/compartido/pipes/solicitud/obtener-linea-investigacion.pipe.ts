import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LineaInvestigacionService } from '../../../../servicios/parametros/linea-investigacion.service';

@Pipe({
  name: 'obtenerLineaInvestigacion'
})
export class ObtenerLineaInvestigacionPipe implements PipeTransform {

  constructor(
    private lineaInvestigacionService: LineaInvestigacionService
  ) {

  }

  async transform(id?: number): Promise<string> {
    
    if(id){
      const lineaInvestigacion = await firstValueFrom(this.lineaInvestigacionService.BuscarRegistro(id));

      return lineaInvestigacion.nombre || "No existe linea de investigación";
    }
    return "No existe linea de investigación";
  }

}
