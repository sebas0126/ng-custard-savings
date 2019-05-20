import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {  } from '@angular/fire/';

import { User } from '../../_model/User.model';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: AngularFirestoreDocument<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore) {
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  async login(email: string, password: string){
    try{
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      
      console.log(this.afAuth.user);
      console.log(this.afStore.doc(`users/${email}`));
    }catch(e){
      console.log(e);
    }
  }

  async signup(email: string, password: string){
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout(){
    await this.afAuth.auth.signOut();
  }
}
