import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ModalidadService } from '../../../../servicios/parametros/modalidad.service';

@Pipe({
  name: 'obtenerModalidad'
})
export class ObtenerModalidadPipe implements PipeTransform {

  constructor(
    private modalidadService: ModalidadService
  ) {

  }

  async transform(id?: number): Promise<string> {
    
    if(id){
      const modalidad = await firstValueFrom(this.modalidadService.BuscarRegistro(id));

      return modalidad.nombre || "No existe modalidad";
    }
    return "No existe modalidad";
  }


}
