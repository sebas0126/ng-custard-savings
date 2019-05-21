import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';

import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content.component';
import { ComponentsModule } from '../core/_components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ComponentsModule
  ]
})
export class ContentModule { }
