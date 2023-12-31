import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static ValidateName(control: AbstractControl) {
    const value = control.value as string;

    if (value.includes('test')) {
      return {
        invalidName: true,
      };
    }
    return null;
  }

  static ValidateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) {
        return {
          invalidSpecialChar: true,
        };
      }
      return null;
    };
  }

  static ValidateDate(fg: FormGroup) {
    const checkinDate: any = new Date(fg.get('checkinDate')?.value);
    const checkoutDate: any = new Date(fg.get('checkoutDate')?.value);
    const diffTime = checkoutDate - checkinDate;
    const diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDate);
    if (diffDate <= 0) {
      fg.get('checkoutDate')?.setErrors({
        invalidDate: true,
      });
      return {
        invalidDate: true,
      };
    }
    return null;
  }
}
