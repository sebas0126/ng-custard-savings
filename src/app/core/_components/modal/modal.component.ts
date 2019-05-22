import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ModalService } from '../../_services/modal/modal.service';

@Component({
  selector: 'cst-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  private element: any;

  show: boolean = false;

  constructor(
    private modalService: ModalService,
    private er: ElementRef
  ) {
    this.element = er.nativeElement;
  }

  ngOnInit() {
    let modal = this;

    if (!this.id) return;

    this.modalService.add(this);
  }

  open(): void {
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

}
