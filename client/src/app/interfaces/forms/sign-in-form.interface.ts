import { FormControl } from '@angular/forms';

export interface ISignInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
