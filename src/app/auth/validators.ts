import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if (control.value !== matchingControl.value) {
			let errors = Object.assign({}, { mustMatch: true }, matchingControl.errors)
			matchingControl.setErrors(errors);
		} else {
			let errors = Object.assign({}, matchingControl.errors);
			delete errors.mustMatch;
			matchingControl.setErrors(Object.getOwnPropertyNames(errors).length === 0 ? null : errors);
		}
	}
}