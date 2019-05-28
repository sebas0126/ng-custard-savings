import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Collections, Months } from '../../_strings/constants';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SavingData } from '../../_models/savingData.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { MonthlySaving } from '../../_models/monthlySaving.model';
import { Saving } from '../../_models/saving,model';

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  private savingData: AngularFirestoreDocument<SavingData> = null;
  private monthlySaving: AngularFirestoreDocument<MonthlySaving> = null;
  private saving: AngularFirestoreDocument<Saving> = null;
  private uid: string;

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.auth.onAuthStateChanged(auth => {
      if (auth) this.uid = auth.uid;
      else this.uid = null;
    })
  }
  
  get isSavingLoaded(): boolean{
    return !!this.saving;
  }

  obtainSavingData(savingId: string): Observable<boolean> {
    this.savingData = this.getSavingDataDocument(savingId);
    this.saving = this.getSavingDocument(savingId);
    return of(true);
  }

  private getSavingDataDocument(savingId: string): AngularFirestoreDocument<SavingData> {
    return this.afStore.doc(`${Collections.savingData}/${savingId}`);
  }

  private getMonthlySavingDocument(month: string): AngularFirestoreDocument<MonthlySaving> {
    return this.saving.collection(`${Collections.users}/${this.uid}/${Collections.monthlySavings}`).doc(String(month));
  }

  private getSavingDocument(savingId: string): AngularFirestoreDocument<Saving> {
    return this.afStore.doc(`${Collections.saving}/${savingId}`);
  }

  getSavingDataState(): Observable<SavingData> {
    return this.savingData.valueChanges();
  }

  getMonthlySavingsState(month: string): Observable<MonthlySaving> {
    this.monthlySaving = this.getMonthlySavingDocument(month);
    return this.monthlySaving.valueChanges();
  }

  getSavingState(): Observable<Saving> {
    return this.saving.valueChanges();
  }

  getSavingData(): Observable<SavingData> {
    return this.savingData.get().pipe(map(ref => ref.data() as SavingData));
  }

  getAllMonthlySavingsState(): Observable<Array<MonthlySaving>>{
    let monthsRef = this.saving.collection(`${Collections.users}/${this.uid}/${Collections.monthlySavings}`);
    return monthsRef.valueChanges().pipe(map(ref => {
      let months = [];
      ref.forEach((x, i) => {
        let month: MonthlySaving = {
          lottery: x.lottery,
          savings: x.savings,
          events: x.events,
          money: x.money,
          win: x.win,
          month: Months[i]
        }
        months.push(month);
      })
      return months;
    }))
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
