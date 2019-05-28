import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ModalComponent, SidebarComponent, LoadingComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ModalComponent,
    SidebarComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
