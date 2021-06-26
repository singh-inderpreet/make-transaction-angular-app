import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateAmount(): ValidatorFn  {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (String(value).indexOf('-') !== -1) {
            return { invalidAmount: true };
        }
        return null;
    }
}