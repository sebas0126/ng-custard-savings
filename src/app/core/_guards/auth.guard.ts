import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../_services/auth/auth.service';
import { Routes } from 'src/app/core/_strings/constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authService: AuthService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isLoggedIn) return true;

		this.router.navigate([Routes.login], { queryParams: { returnUrl: state.url } });
		return false;
	}
}