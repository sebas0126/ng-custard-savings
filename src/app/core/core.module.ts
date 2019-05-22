import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './_services/auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { ComponentsModule } from './_components/components.module';
import { ContentModule } from '../content/content.module';
import { ModalService } from './_services/modal/modal.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
    ComponentsModule,
    ContentModule,
  ],
  providers: [
    AuthService,
    ModalService
  ]
})
export class CoreModule { }
