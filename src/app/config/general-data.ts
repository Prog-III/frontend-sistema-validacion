export namespace GeneralData {
    export const EMAIL_MIN_LONGITUD = 4;
    export const CLAVE_MIN_LONGITUD = 8;

    export const MENSAJE_FORMULARIO_INVALIDO = 'Formulario inválido, verifique la información';
    export const MENSAJE_FORMULARIO_VALIDO = 'Ok';
    export const FORMULARIO_INVALIDO = 'Error';
    export const FORMULARIO_VALIDO = 'Aprobado';
    export const MODAL_MENSAJE_GENERAL = 'Ok';

    export const TOAST_MENSAJE_CREACION = (componente: string) => `${componente} se ha creado correctamente`;
    export const TOAST_MENSAJE_ELIMINACION = (componente: string) => `${componente} se ha eliminado correctamente`;
    export const TOAST_ERROR_ELIMINACION = (componente: string) => `${componente} no se ha eliminado`;
    export const TOAST_ERROR_CREACION = (componente: string) => `${componente} no se ha eliminado`;
    export const TOAST_MENSAJE_EDICION = (componente: string) => `${componente} se ha editado correctamente`;
    export const TOAST_ERROR_EDICION = (componente: string) => `${componente} no se ha editado`;

    export const MS_SEGUIRIDAD_URL = "http://localhost:3002";
    export const MS_NEGOCIO_URL = "http://localhost:3000";
    export const MENSAJE_GUARDAR = "Registro almacenado."
    export const MENSAJE_ACTUALIZAR = "Registro actualizado."
    export const MENSAJE_ELIMINAR = "Registro eliminado."
    export const ARG_ELIMINACION = "Eliminación"
    export const CONFIRMACION_ELIMINACION= "¿Seguro que desea eliminar el registro?"
    
    export const MENSAJE_ERROR = "Error en el backend."
    export const KEY_RECAPTCHA = "6LeNbTcdAAAAAKOzE76Uk0RB-Vkq2-3su860xC89"

    export const RECORDS_BY_PAGE = 10;

}