import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../../_model/User.model';

import { Collections } from '../../_strings/constants';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: AngularFirestoreDocument<User> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore) {
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  async login(email: string, password: string) {
    try {
      let credentials = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.user = this.afStore.doc(`${Collections.users}/${credentials.user.uid}`);
    } catch (e) {
      return Promise.reject();
    }
  }

  async signup(email: string, password: string, firstname: string, lastname: string) {
    try {
      const credentials = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return this.createUser(credentials.user.uid, firstname, lastname, email);
    } catch (e) {
      return Promise.reject();
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.user = null;
  }

  createUser(uid: string, firstname: string, lastname: string, email: string) {
    this.user = this.afStore.doc(`${Collections.users}/${uid}`);
    return this.user.set({
      firstname,
      lastname, 
      email
    });
  }
}
