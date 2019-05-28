import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../core/_guards/auth.guard';
import { ContentComponent } from './content.component';
import { UserResolve } from '../core/_guards/user.resolve';
import { MonthComponent } from './month/month.component';
import { SavingResolve } from '../core/_guards/saving.resolve';

const routes: Routes = [
  {
    path: 'content', component: ContentComponent, resolve: [UserResolve],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'month/:month', component: MonthComponent, canActivate: [AuthGuard], resolve: [SavingResolve] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
