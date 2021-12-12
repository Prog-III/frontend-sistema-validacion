import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'existeImagen'
})
export class ExisteImagenPipe implements PipeTransform {

  async transform(imageSrc: string): Promise<string> {
    const imageResponse = fetch(imageSrc);
    
    if ((await imageResponse).ok) {
      return imageSrc;
    }
    
    return "../../../../../../../assets/images/usuario-de-perfil.png";
  }

}
