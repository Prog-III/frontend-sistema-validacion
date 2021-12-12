import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';

@Pipe({
  name: 'obtenerNombreJurado'
})
export class ObtenerNombreJuradoPipe implements PipeTransform {
  constructor(
    private juradoService: JuradoService
  ) {
    
  }
  async transform(idJurado: number): Promise<string> {
    const juradoEncontrado = await firstValueFrom(this.juradoService.BuscarRegistro(idJurado));

    if (juradoEncontrado.nombre) {
      return juradoEncontrado.nombre;
    }

    return "No hay registro";
  }
}
