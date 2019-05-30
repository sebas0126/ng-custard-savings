import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../../_models/message.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Collections, InfoTypes } from '../../_strings/constants';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  generalMessages: AngularFirestoreCollection<Message> = null;
  userMessages: AngularFirestoreCollection<Message> = null;

  uid: string;

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.auth.onAuthStateChanged(auth => {
      if (auth) this.uid = auth.uid;
      else this.uid = null;
    })
  }

  obtainUserMessages() {
    this.userMessages = this.getUserMessagesCollection();
  }

  obtainGeneralMessages(savingId: string) {
    this.generalMessages = this.getGeneralMessagesCollection(savingId);
  }

  private getUserMessagesCollection(): AngularFirestoreCollection<Message> {
    return this.afStore.collection(`${Collections.userMessage}/${this.uid}/${Collections.message}`);
  }

  private getGeneralMessagesCollection(savingId: string): AngularFirestoreCollection<Message> {
    return this.afStore.collection(`${Collections.generalMessage}/${savingId}/${Collections.message}`);
  }

  getUserMessagesState(): Observable<any> {
    return this.userMessages.valueChanges().pipe(map(uRef => {
      let messages: Array<Message> = [];
      uRef.forEach(msg => {
        let message: Message = {
          content: msg.content,
          group: msg.group,
          type: msg.type,
          icon: this.getIcon(msg.type),
          actionText: msg.actionText,
          action: msg.action
        }
        messages.push(message);
      });
      if (messages.length <= 0) {
        let msg: Message = {
          content: 'No tienes mensajes',
          type: 'general',
          icon: this.getIcon('general'),
          group: 'empty',
        }
        messages.push(msg);
      }
      return messages;
    }))
  }

  getGeneralMessagesState(): Observable<Array<Message>> {
    return this.generalMessages.valueChanges().pipe(map(gRef => {
      let messages: Array<Message> = [];
      gRef.forEach(msg => {
        let message: Message = {
          content: msg.content,
          group: msg.group,
          type: msg.type,
          icon: this.getIcon(msg.type),
          actionText: msg.actionText,
          action: msg.action
        }
        messages.push(message);
      });
      if (messages.length <= 0) {
        let msg: Message = {
          content: 'No tienes mensajes',
          type: 'general',
          icon: this.getIcon('general'),
          group: 'empty'
        }
        messages.push(msg);
      }
      return messages;
    }))
  }

  getIcon(type: string) {
    switch (type) {
      case InfoTypes.error:
        return 'error';
      case InfoTypes.success:
        return 'check_circle';
      case InfoTypes.warning:
        return 'warning';
      default:
        return 'info';
    }
  }

}
