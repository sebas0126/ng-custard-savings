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

  userMessages: Array<Message> = [];
  generalMessages: Array<Message> = [];
  months: Array<any> = [];

  userSubscription: Subscription;
  savingDataSubscription: Subscription;
  monthlySavingSubscription: Subscription;
  generalMessageSubscription: Subscription;
  userMessageSubscription: Subscription;

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
      } else {
        this.savingData = null;
        if (this.savingDataSubscription) this.savingDataSubscription.unsubscribe();
      }
    })
  }

  getAllSavings() {
    this.savingService.getSavingList().pipe(first()).subscribe(data => {
      this.savings = data;
    })
  }

  getSavingData(savingId: string) {
    this.savingService.obtainSavingData(savingId);
    this.savingDataSubscription = this.savingService.getSavingDataState().subscribe(data => this.savingData = data);
  }

  getMonthlySavings() {
    this.monthlySavingSubscription = this.savingService.getAllMonthlySavingsState().subscribe(data => this.monthlySavings = data)
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

  goMonth(month: string){
    this.router.navigate([`content/month/${month}`]);
  }
  
  messageAction = {
    joinRequest: this.showModal
  }

}
