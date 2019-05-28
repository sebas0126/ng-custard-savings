import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../../_models/User.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Collections } from '../../_strings/constants';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: AngularFirestoreDocument<User> = null;

  constructor(
    private afStore: AngularFirestore
  ) { }

  get isUserLoaded(): boolean {
    return !!this.user;
  }

  obtainUserSaving(uid: string): Observable<string> {
    this.user = this.getUserDocument(uid);
    return this.getUserSaving();
  }

  createUser(uid: string, firstname: string, lastname: string, email: string): Promise<void> {
    this.user = this.getUserDocument(uid);
    return this.user.set({
      firstname,
      lastname,
      email,
    });
  }

  getUserState(): Observable<User> {
    return this.user.valueChanges();
  }

  getUserSaving(): Observable<string> {
    return this.user.get().pipe(map(ref => {
      let data = ref.data();
      return data.saving ? data.saving : ''
    }));
  }

  private getUserDocument(uid: string): AngularFirestoreDocument<User> {
    return this.afStore.doc(`${Collections.users}/${uid}`);
  }
}
