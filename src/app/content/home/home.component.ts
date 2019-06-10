import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalService } from 'src/app/core/_services/modal/modal.service';
import { SavingService } from 'src/app/core/_services/saving/saving.service';

import { UserService } from 'src/app/core/_services/user/user.service';
import { SavingData } from 'src/app/core/_models/savingData.model';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MonthlySaving } from 'src/app/core/_models/monthlySaving.model';
import { MessageService } from 'src/app/core/_services/message/message.service';
import { Message } from 'src/app/core/_models/message.model';
import { Router } from '@angular/router';
import { Saving } from 'src/app/core/_models/saving,model';
import { MonthData } from 'src/app/core/_models/monthData.model';
import { InfoTypes } from 'src/app/core/_strings/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit, OnDestroy {

  savingForm: FormGroup;

  savings: Array<any>;
  savingId: string;
  savingData: SavingData;
  monthlySavings: Array<MonthlySaving>;
  months : Array<MonthData>;
  saving: Saving;
  userSaving: Saving;

  userMessages: Array<Message> = [];
  generalMessages: Array<Message> = [];

  userSubscription: Subscription;
  savingDataSubscription: Subscription;
  monthlySavingSubscription: Subscription;
  generalMessageSubscription: Subscription;
  userMessageSubscription: Subscription;
  savingSubscription: Subscription;
  userSavingSubscription: Subscription;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private savingService: SavingService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.getAllSavings();
    this.getUserSavingData();
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.savingDataSubscription) this.savingDataSubscription.unsubscribe();
    if (this.userMessageSubscription) this.userMessageSubscription.unsubscribe();
    if (this.generalMessageSubscription) this.generalMessageSubscription.unsubscribe();
    if (this.savingSubscription) this.savingSubscription.unsubscribe();
    if (this.userSavingSubscription) this.userSavingSubscription.unsubscribe();
  }

  get form() {
    return this.savingForm.controls;
  }

  createForm() {
    this.savingForm = this.formBuilder.group({
      saving: ['', [Validators.required]]
    });
  }

  getUserSavingData() {
    this.userService.getUserState().subscribe(user => {
      this.getUserMessages();
      if (user.saving) {
        this.getSavingData(user.saving);
        this.getMonthlySavings();
        this.getGeneralMessages(user.saving);
        this.getUserSaving();
        this.getMonthData();
      } else {
        this.savingData = null;
        if (this.savingDataSubscription) this.savingDataSubscription.unsubscribe();
        if (this.generalMessageSubscription) this.generalMessageSubscription.unsubscribe();
        if (this.savingSubscription) this.savingSubscription.unsubscribe();
        if (this.userSavingSubscription) this.userSavingSubscription.unsubscribe();
      }
    })
  }

  getAllSavings() {
    this.savingService.getSavingList().pipe(first()).subscribe(data => {
      this.savings = data;
    })
  }

  getMonthData(){
    this.savingService.getAllMonthDataState().subscribe(data => this.months = data);
  }

  getSavingData(savingId: string) {
    this.savingService.obtainSavingData(savingId);
    this.savingDataSubscription = this.savingService.getSavingDataState().subscribe(data => this.savingData = data);
  }

  getSaving() {
    this.savingSubscription = this.savingService.getSavingState().subscribe(data => this.saving = data);
  }

  getUserSaving() {
    this.userSavingSubscription = this.savingService.getUserSavingState().subscribe(data => {
      this.userSaving = data
    });
  }

  getMonthlySavings() {
    this.monthlySavingSubscription = this.savingService.getAllMonthlySavingsState().subscribe(data => this.monthlySavings = data.sort((a, b) => a.monthId - b.monthId))
  }

  getGeneralMessages(savingId: string) {
    this.messageService.obtainGeneralMessages(savingId);
    this.generalMessageSubscription = this.messageService.getGeneralMessagesState().subscribe(data => this.generalMessages = data);
  }

  getUserMessages() {
    this.messageService.obtainUserMessages();
    this.userMessageSubscription = this.messageService.getUserMessagesState().subscribe(data => this.userMessages = data);
  }

  showModal = () => {
    this.savingForm.reset();
    this.modalService.open('join-modal');
  }

  closeModal() {
    this.modalService.close('join-modal');
  }

  onSubmit() {
    this.savingService.requestJoinSaving(this.form.saving.value);
    this.closeModal();
  }

  goMonth(month: string) {
    this.router.navigate([`content/month/${month}`]);
  }

  verifyMonthState(month: MonthlySaving){
    let currMonth = new Date().getMonth();
    if(month.monthId > currMonth) return;
    if(!month) return; 
    if(!this.months) return;
    if(month.savings > 0 && month.lottery > 0){
      let monthData = this.months.find(x => x.month === month.monthId);
      if(monthData.event){
        if(month.events > 0) return "#7CB342";
        else return "#FFB300";
      }else{
        return "#7CB342";
      }
    }else{
      return "#B71C1C";
    }
  }

  messageAction = {
    joinRequest: this.showModal
  }

}
