import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Collections } from '../../_strings/constants';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../_models/User.model';
import { UserService } from '../user/user.service';
import { SavingData } from '../../_models/savingData.model';

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  uid: string;
  user: User;

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    afAuth.auth.onAuthStateChanged(auth => {
      if (auth) {
        this.uid = auth.uid
      } else {
        this.uid = null;
      }
    })
  }

  getSavingData(): Observable<any> {
    return of();
  }

  getSavingList(): Observable<any> {
    let savingsRef = this.afStore.collection(`${Collections.savingData}`);
    return savingsRef.get().pipe(map(ref => {
      let savings = [];
      ref.forEach(x => savings.push({ name: x.data().name, id: x.id }));
      return savings;
    }))
  }

  requestJoinSaving(savingId: string) {
    let requestRef = this.afStore.collection(`${Collections.joinRequest}`);
    requestRef.add({
      userId: this.uid,
      savingId: savingId,
      approved: false
    })
  }
}
