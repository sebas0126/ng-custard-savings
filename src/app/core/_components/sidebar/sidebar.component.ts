import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, HostListener } from '@angular/core';
import { SavingService } from '../../_services/saving/saving.service';
import { SavingData } from '../../_models/savingData.model';
import { Months } from '../../_strings/constants';
import { ComponentsModule } from '../components.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() hasSaving: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.verifyWindowSize(event.target);
  }
  months: Array<any> = [];

  showBar = true;

  constructor() { }

  ngOnInit() {
    this.fillMonths(this.months);
    this.verifyWindowSize(window);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.hasSaving = changes.hasSaving.currentValue;
  }

  verifyWindowSize(w){
    if(w.innerWidth < 640){
      this.showBar = false;
    }else{
      this.showBar = true;
    }
  }

  fillMonths(months: Array<any>) {
    for (let i = 0; i < 12; i++) {
      months.push({
        text: Months[i],
        url: `month/${i}`
      })
    }
  }

  toggleBar() {
    this.showBar = !this.showBar;
  }

}
