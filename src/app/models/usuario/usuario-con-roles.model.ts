import { RolModel } from './rol.model';

export class UsuarioConRolesModel { // Este modelo se utliza para poder renderizar en el html el usuario con todos sus roles
    _id?: string;
    nombres?: string;
    apellidos?: string;
    documento?: string;
    fecha_nacimiento?: Date;
    correo?: string;
    celular?: string;
    estado?: boolean;
    roles?: RolModel[]
}