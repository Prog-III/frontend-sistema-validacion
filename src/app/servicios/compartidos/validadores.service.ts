import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { JuradoService } from '../parametros/jurado.service';
import { CorreoNotificacionService } from '../parametros/correo-notificacion.service';
import { ProponenteService } from '../seguridad/proponente.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor(
    private juradoService: JuradoService,
    private correoNotificacionService: CorreoNotificacionService,
    private proponenteService: ProponenteService,
    private usuarioService: UsuarioService
  ) { }

  existeEmailJurado(emailExcepcion?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {      
      return this.juradoService.GetRecordList()
        .pipe(map(jurados => jurados.map(jurado => jurado.email)))
        .pipe(map(jurados => {
          if (emailExcepcion) {
            jurados = jurados.filter(jurado => jurado !== emailExcepcion);
          }          

          return jurados.includes(control.value) ? { 'emailNoDisponible': true } : null;
        }))
    }
  }

  existeCorreoNotificacion(emailExcepcion?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.correoNotificacionService.GetRecordList()
        .pipe(map(correos => correos.map(correo => correo.correo)))
        .pipe(map(correos => {
          if (emailExcepcion) {
            correos = correos.filter(correo => correo !== emailExcepcion)
          }

          return correos.includes(control.value) ? { 'emailNoDisponible': true } : null;
        }))
    }
  }

  existeEmailProponente(emailExcepcion?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.proponenteService.GetRecordList()
        .pipe(map(proponentes => proponentes.map(proponente => proponente.email)))
        .pipe(map(proponentes => {
          if (emailExcepcion) {
            proponentes = proponentes.filter(email => email !== emailExcepcion)
          }

          return proponentes.includes(control.value) ? { 'emailNoDisponible': true } : null;
        }))
    }
  }

  existeDocumentoProponente(documentoExcepcion?: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.proponenteService.GetRecordList()
        .pipe(map(proponentes => proponentes.map(proponente => proponente.documento)))
        .pipe(map(proponentes => {
          if (documentoExcepcion) {
            proponentes = proponentes.filter(documento => documento !== documentoExcepcion)
          }

          return proponentes.includes(control.value) ? { 'documentoNoDisponible': true } : null;
        }))
    }
  }

  existeDocumentoUsuario(documentoExcepcion?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usuarioService.GetRecordList()
        .pipe(map(usuarios => usuarios.map(usuario => usuario.documento)))
        .pipe(map(usuarios => {
          if (documentoExcepcion) {
            usuarios = usuarios.filter(documento => documento !== documentoExcepcion)
          }

          return usuarios.includes(control.value) ? { 'documentoNoDisponible': true } : null;
        }))
    }
  }

  existeEmailUsuario(emailExcepcion?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usuarioService.GetRecordList()
        .pipe(map(usuarios => usuarios.map(usuario => usuario.correo)))
        .pipe(map(usuarios => {
          if (emailExcepcion) {
            usuarios = usuarios.filter(email => email !== emailExcepcion)
          }

          return usuarios.includes(control.value) ? { 'emailNoDisponible': true } : null;
        }))
    }
  }
}
