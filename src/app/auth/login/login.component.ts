import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/_services/auth/auth.service';

import { Errors, Routes } from 'src/app/core/_strings/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;
  redirect: string;

  showLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.route.queryParams.subscribe(params => this.redirect = params['return'] || Routes.home);
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.showLoading = true;
    this.error = null;
    this.authService.login(
      this.form.email.value,
      this.form.password.value).then(() => {
        this.router.navigate([this.redirect]);
      }).catch(e => {
        this.error = Errors.login;
        this.showLoading = false;
      })
  }

}
