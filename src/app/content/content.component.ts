import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SavingData } from '../core/_models/savingData.model';
import { SavingService } from '../core/_services/saving/saving.service';
import { map } from 'rxjs/operators';
import { UserService } from '../core/_services/user/user.service';
import { Subscription, fromEvent } from 'rxjs';
import { Saving } from '../core/_models/saving,model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit, OnDestroy {

  savingId: string;
  savingData: SavingData = null;
  saving: Saving = null;

  savingDataSubscription: Subscription;
  userSubscription: Subscription;
  savingSubscription: Subscription;

  sbY: number = 20;

  constructor(
    private savingService: SavingService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserSavingData();
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.savingDataSubscription) this.savingDataSubscription.unsubscribe();
  }

  getUserSavingData() {
    this.userService.getUserState().subscribe(user => {
      if (user.saving) {
        this.savingService.obtainSavingData(user.saving);
        this.savingDataSubscription = this.savingService.getSavingDataState().subscribe(data => this.savingData = data);
      } else {
        this.savingData = null;
        if (this.savingDataSubscription) this.savingDataSubscription.unsubscribe();
      }
    })
  }

  touchMove(e){
    let touch = e.changedTouches[0];
    this.sbY = touch.clientY - 36;
    if(this.sbY < 0) this.sbY = 0;
    e.preventDefault();
  }

}
