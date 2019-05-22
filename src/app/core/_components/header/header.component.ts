import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { Routes } from '../../_strings/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  onLogoutClick(){
    this.authService.logout().then(() => {
      this.router.navigate([Routes.login]);
    })
  }

}
