import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user/user.service';
import { AuthService } from '../_services/auth/auth.service';
import { flatMap, map } from 'rxjs/operators';
import { SavingService } from '../_services/saving/saving.service';
import { MonthlySaving } from '../_models/monthlySaving.model';

@Injectable({
  providedIn: 'root'
})
export class SavingResolve implements Resolve<any> {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private savingService: SavingService
  ){}

  resolve(route: ActivatedRouteSnapshot): Observable<Observable<MonthlySaving>>{
    if(this.savingService.isSavingLoaded){
      return of(this.savingService.getMonthlySavingsState(route.params.month));
    }
    return this.userService.obtainUserSaving(this.authService.uid).pipe(flatMap(sav => {
      return this.savingService.obtainSavingData(sav).pipe(map(() => {
        return this.savingService.getMonthlySavingsState(route.params.month);
      }))
    }))
  }
  
}
