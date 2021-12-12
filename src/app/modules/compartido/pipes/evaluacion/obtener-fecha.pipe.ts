import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'obtenerFecha'
})
export class ObtenerFechaPipe implements PipeTransform {

  transform(fecha: string): string {
    return dayjs(fecha).format('DD/MM/YYYY');
  }

}
