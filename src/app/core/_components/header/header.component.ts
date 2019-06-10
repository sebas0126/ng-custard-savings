import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { Routes } from '../../_strings/constants';
import { UserService } from '../../_services/user/user.service';
import { User } from '../../_models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User;

  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  onLogoutClick() {
    this.authService.logout().then(() => {
      this.router.navigate([Routes.login]);
    })
  }

  getUserData() {
    this.userSubscription = this.userService.getUserState().subscribe(data => this.user = data);
  }

}
