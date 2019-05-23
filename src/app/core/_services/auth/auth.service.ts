import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
  ) {
  }

  get isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(take(1), map(auth => !!auth));
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      return Promise.reject();
    }
  }

  async signup(email: string, password: string) {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      return Promise.reject();
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
  }

}
