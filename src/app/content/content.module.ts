import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContentRoutingModule } from './content-routing.module';

import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content.component';
import { ComponentsModule } from '../core/_components/components.module';
import { MonthComponent } from './month/month.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContentComponent,
    MonthComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
