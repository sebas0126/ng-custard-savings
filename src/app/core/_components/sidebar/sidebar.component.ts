import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { SavingService } from '../../_services/saving/saving.service';
import { SavingData } from '../../_models/savingData.model';
import { Months } from '../../_strings/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() hasSaving: boolean;
  months: Array<any> = []

  constructor() { }

  ngOnInit() {
    this.fillMonths(this.months);
  }

  ngOnChanges(changes: SimpleChanges){
    this.hasSaving = changes.hasSaving.currentValue;
  }

  fillMonths(months: Array<any>){
    for(let i = 0; i < 12; i++){
      months.push({
        text: Months[i],
        url: `month/${i}`
      })
    }
  }

}
