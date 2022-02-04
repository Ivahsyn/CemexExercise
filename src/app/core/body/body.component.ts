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

  currentFilters!: SelectedFilters;
  autocompleteValue!: string;

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
    this.autocompleteValue = name;
    this.filter();
  }

  filterData(filters: SelectedFilters): void {
    this.currentFilters = filters;
    this.filter();
  }

  private filter(): void {
    this.inputData = [...this.dataSource];

    if (this.autocompleteValue) {
      this.inputData = this.inputData.filter(item => {
        const index: number = item.supplierName.toLowerCase().indexOf(this.autocompleteValue.toLowerCase());
        return index >= 0;
      });
    }

    if (this.currentFilters) {
      let dataForSelectedMonth: Array<RequestedData> = [];
      if (this.currentFilters.selectedMonth) {
        dataForSelectedMonth = [...this.inputData.filter(item => item.month === this.currentFilters.selectedMonth)];
      } else {
        dataForSelectedMonth = [...this.inputData];
      }

      let dataForSelectedPhase: Array<RequestedData> = [];
      if (this.currentFilters.selectedPhase) {
        dataForSelectedPhase = [...this.inputData.filter(item => item.phase === this.currentFilters.selectedPhase)];
      } else {
        dataForSelectedPhase = [...this.inputData];
      }

      let dataForSelectedStatus: Array<RequestedData> = [];
      if (this.currentFilters.selectedStatus.every(item => item.active === false)) {
        dataForSelectedStatus = [...this.inputData];
      } else {
        this.currentFilters.selectedStatus.forEach(status => {
          if (status.active) {
            let localFilter = [...this.inputData.filter(item => item.status === status.value)];
            dataForSelectedStatus = dataForSelectedStatus.concat(localFilter);
            dataForSelectedStatus = dataForSelectedStatus.filter((value, index, self) => {
              return self.indexOf(value) === index;
            })
          }
        })
      }

      this.inputData = [...dataForSelectedStatus.filter(item => dataForSelectedMonth.includes(item)).filter(item => dataForSelectedPhase.includes(item))]
    }

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
