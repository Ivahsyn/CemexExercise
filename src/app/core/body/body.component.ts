import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestedData } from 'src/app/shared/interfaces/requested-data';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { SelectedFilters } from '../filters/filters.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  nameAutocomplete: Array<string> = [];

  displayedColumns: string[] = ['Status', 'Supplier Name', 'Month', 'Phase', 'Internal Order', 'Amount (USD)'];
  dataSource: Array<RequestedData> = [];
  inputData: Array<RequestedData> = [];

  dbSubscription: Subscription = new Subscription();

  totalAmountValue: number = 0;

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.dbSubscription = this.db.getData().subscribe((res: Array<RequestedData>) => {
      this.dataSource = res;
      this.inputData = [...this.dataSource];
      this.totalAmountValue = res.map(item => item.amount).reduce((sum, value) => sum + value);
      this.nameAutocomplete = res.map(item => item.supplierName);
    });
  }

  ngOnDestroy(): void {
    this.dbSubscription.unsubscribe();
  }

  filterDataByName(name: string): void {
    console.log('toFilterDataByName', name);
    if (name) {
      this.inputData = this.inputData.filter(item => item.supplierName === name);
    } else {
      this.inputData = [...this.dataSource];
    }
    this.countTotal();
  }

  filterData(filters: SelectedFilters): void {
    console.log('filterData', filters);
    this.inputData = [...this.dataSource];

    let dataForSelectedMonth: Array<RequestedData> = [];
    if (filters.selectedMonth) {
      dataForSelectedMonth = [...this.inputData.filter(item => item.month === filters.selectedMonth)];
    } else {
      dataForSelectedMonth = [...this.dataSource];
    }
    console.log('dataForSelectedMonth', dataForSelectedMonth);

    let dataForSelectedPhase: Array<RequestedData> = [];
    if (filters.selectedPhase) {
      dataForSelectedPhase = [...this.inputData.filter(item => item.phase === filters.selectedPhase)];
    } else {
      dataForSelectedPhase = [...this.dataSource];
    }
    console.log('dataForSelectedPhase', dataForSelectedPhase);

    let dataForSelectedStatus: Array<RequestedData> = [];
    if (filters.selectedStatus.every(item => item.active === false)) {
      dataForSelectedStatus = [...this.dataSource];
    } else {
      dataForSelectedStatus = [...this.dataSource];
      filters.selectedStatus.forEach(status => {
        if (status.active) {
          dataForSelectedStatus = [...dataForSelectedStatus.filter(item => item.status === status.value)];
        }
      })
    }
    console.log('dataForSelectedStatus', dataForSelectedStatus);

    this.inputData = [...dataForSelectedStatus.filter(item => dataForSelectedMonth.includes(item)).filter(item => dataForSelectedPhase.includes(item))]
    console.log('this.inputData', this.inputData);
    this.countTotal();
  }

  countTotal(): void {
    if (this.inputData.length > 0) {
      this.totalAmountValue = this.inputData.map(item => item.amount).reduce((sum, value) => sum + value);
    } else {
      this.totalAmountValue = 0;
    }
  }
}
