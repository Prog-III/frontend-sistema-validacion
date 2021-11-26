import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const existeArregloValidator = (arreglo: any[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {        
        if (arreglo.length <= 0) {
            return { "error": "Arreglo vacio" }
        }

        return null;
    }
}
