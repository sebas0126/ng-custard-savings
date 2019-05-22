import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../_services/auth/auth.service';
import { Routes } from 'src/app/core/_strings/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService.isLoggedIn.pipe(map(auth => {
			if(!auth){
				this.router.navigate([Routes.login], { queryParams: { return: state.url } })
			}
			return auth;
		}));
	}
}