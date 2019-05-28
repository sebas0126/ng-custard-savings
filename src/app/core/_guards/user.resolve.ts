import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user/user.service';
import { AuthService } from '../_services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolve implements Resolve<any> {

  constructor(
    private userService: UserService,
    private authService: AuthService
  ){}

  resolve(): Observable<boolean>{
    return this.userService.obtainUserSaving(this.authService.uid).pipe(map(sav => !!sav));
  }
  
}
