import { Component, OnInit, OnDestroy } from '@angular/core';
import { SavingService } from 'src/app/core/_services/saving/saving.service';
import { ActivatedRoute } from '@angular/router';
import { MonthlySaving } from 'src/app/core/_models/monthlySaving.model';
import { Subscription } from 'rxjs';
import { Months } from 'src/app/core/_strings/constants';
import { MonthData } from 'src/app/core/_models/monthData.model';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.sass']
})
export class MonthComponent implements OnInit, OnDestroy {

  monthId: string;
  monthName: string;
  missing: Array<string>;
  isComing: boolean;

  monthlySaving: MonthlySaving = null;
  monthData: MonthData = null;

  monthlySubscription: Subscription;
  paramsSubscription: Subscription;
  monthDataSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private savingService: SavingService
  ) { }

  ngOnInit() {
    this.getMonth();
  }

  ngOnDestroy() {
    if (this.monthlySubscription) this.monthlySubscription.unsubscribe();
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe();
  }

  getMonthlySaving() {
    this.monthlySubscription = this.route.snapshot.data[0]
    .subscribe(data => {
      this.monthlySaving = data
      this.monthDataSubscription = this.savingService.getMonthDataState(this.monthId).subscribe(data => {
        this.monthData = data;
        this.missing = this.calculateMissing();
        this.isComing = (new Date().getMonth() < Number(this.monthId));
      })
    });
  }

  getMonth(){
    this.route.params.subscribe(params => {
      this.monthId = params.month;
      this.monthName = Months[this.monthId];
      this.getMonthlySaving();
    })
  }

  calculateMissing(): Array<string>{
    let missing = [];
    if(this.monthlySaving.savings <= 0){
      missing.push('Ahorro');
    }
    if(this.monthlySaving.lottery <= 0){
      missing.push('Polla');
    }
    if(this.monthData.event && this.monthlySaving.events <= 0){
      missing.push('Evento');
    }
    return missing;
  }
}
