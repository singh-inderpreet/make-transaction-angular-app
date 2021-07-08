import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Global method to validate amount entered
 * @export
 * @return {*}  {ValidatorFn}
 */
export function validateAmount(): ValidatorFn  {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (String(value).indexOf('-') !== -1) {
            return { invalidAmount: true };
        }
        return null;
    }
}