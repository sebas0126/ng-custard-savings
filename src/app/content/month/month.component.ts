import { Component, OnInit, OnDestroy } from '@angular/core';
import { SavingService } from 'src/app/core/_services/saving/saving.service';
import { ActivatedRoute } from '@angular/router';
import { MonthlySaving } from 'src/app/core/_models/monthlySaving.model';
import { Subscription } from 'rxjs';
import { Months } from 'src/app/core/_strings/constants';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.sass']
})
export class MonthComponent implements OnInit, OnDestroy {

  month: string;
  monthName: string;

  monthlySaving: MonthlySaving = null;

  monthlySubscription: Subscription;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute
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
    .subscribe(data => this.monthlySaving = data);
  }

  getMonth(){
    this.route.params.subscribe(params => {
      this.month = params.month;
      this.monthName = Months[this.month];
      this.getMonthlySaving();
    })
  }
}
