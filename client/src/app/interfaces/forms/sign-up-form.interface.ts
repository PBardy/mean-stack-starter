import { FormControl } from '@angular/forms';

export interface ISignUpForm {
  email: FormControl<string | null>;
  fullName: FormControl<string | null>;
  password: FormControl<string | null>;
  repeatPassword: FormControl<string | null>;
}
