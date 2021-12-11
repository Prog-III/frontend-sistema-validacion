import { DatosUsuarioModel } from "./datos-usuario";
import { RolModel } from "./role.model";

export class DatosSesionModel{
    token?: string;
    usuario?: DatosUsuarioModel;
    isLoggedIn: boolean = false;
    roles?: Array<RolModel>;
}