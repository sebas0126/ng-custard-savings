import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalService } from 'src/app/core/_services/modal/modal.service';
import { SavingService } from 'src/app/core/_services/saving/saving.service';

import { InfoTypes, Errors, Actions, Warnings, InfoId, InfoGroup } from 'src/app/core/_strings/constants';
import { UserService } from 'src/app/core/_services/user/user.service';
import { SavingData } from 'src/app/core/_models/savingData.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  savingForm: FormGroup;
  savings: Array<any>;

  savingId: string;
  savingData: SavingData;

  information: Array<any> = [];

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private savingService: SavingService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.savingForm = this.formBuilder.group({
      saving: ['', [Validators.required]]
    });
    this.savingService.getSavingList().subscribe(data => {
      this.savings = data;
    })
    this.userService.getUserState().subscribe(data => {
      if (!data.saving) {
        if (data.request) {
          this.addInformation(Warnings.request, InfoTypes.warning, InfoGroup.savingRequest);
        }else{
          this.addInformation(Errors.noSaving, InfoTypes.error, InfoGroup.savingRequest, this.showModal, Actions.request);
        }
      }
    })
    this.userService.getUserSaving().subscribe(data => {
      //OBTENER LOS DATOS DEL SAVING
    })
  }

  get form() {
    return this.savingForm.controls;
  }

  private addInformation(content: string, type: string, group?: string, action?: () => void, actionText?: Actions) {
    this.information = this.information.filter(x => x.group !== group);
    this.information.push({
      content,
      type,
      action,
      actionText,
      icon: this.getIcon(type),
      group
    });
  }

  private getIcon(type: string) {
    switch (type) {
      case InfoTypes.error:
        return 'error';
      case InfoTypes.success:
        return 'check_circle';
      case InfoTypes.warning:
        return 'warning';
      default:
        return 'bug_report';
    }
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

}
