import { Component, OnInit } from '@angular/core';
import { SavingService } from '../../_services/saving/saving.service';
import { SavingData } from '../../_models/savingData.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  savingData: SavingData;

  constructor(
    private savingService: SavingService
  ) { }

  ngOnInit() {
    this.savingService.getSavingData().subscribe(data => this.savingData = data);
  }

}
