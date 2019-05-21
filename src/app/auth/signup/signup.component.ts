import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/_services/auth/auth.service';

import { MustMatch } from '../validators';
import { Errors, Routes } from 'src/app/core/_strings/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,12}')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,12}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: MustMatch('password', 'repeatPassword') })
  }

  get form() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.error = null;
    this.authService.signup(
      this.form.email.value,
      this.form.password.value,
      this.form.firstname.value,
      this.form.lastname.value).then(() => {
        this.router.navigate([Routes.home]);
      }).catch(e => {
        this.error = Errors.signup;
      })
  }

}
