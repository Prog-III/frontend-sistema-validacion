import { DatosUsuarioModel } from "./datos-usuario";

export class DatosSesionModel{
    token?: string;
    usuario?: DatosUsuarioModel;
    isLoggedIn: boolean = false;
}