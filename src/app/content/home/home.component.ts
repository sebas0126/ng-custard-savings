import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/_services/modal/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  
  custsavForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.custsavForm = this.formBuilder.group({
      custsav: ['', [Validators.required]]
    });
  }

  showModal(){
    this.modalService.open('join-modal');
  }

  closeModal(){
    this.modalService.close('join-modal');
  }

  onSubmit(){
    console.log('solicitud');
  }

}
