import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

export interface Status {
  value: string;
  active: boolean;
}

export interface SelectedFilters {
  selectedStatus: Array<Status>;
  selectedPhase: string;
  selectedMonth: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() toFilter: EventEmitter<SelectedFilters> = new EventEmitter<SelectedFilters>();

  statusValues: Array<string> = ['Active', 'Pending Approval', 'Waiting Compensation'];
  phaseValues: Array<string> = ['Reseach', 'Ideation', 'Development', 'Deployment'];
  monthValues: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  filters!: SelectedFilters;

  showFilters: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.setDefaultFiltersValue();
  }

  openFilters(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        statusValues: this.statusValues,
        phaseValues: this.phaseValues,
        monthValues: this.monthValues,
        filters: this.filters
      },
      width: '80%',
      height: '50%',
      minHeight: '300px',
      maxHeight: '360px',
      position: {
        top: '55px'
      }
    });

    dialogRef.afterClosed().subscribe((result: SelectedFilters) => {
      if (result) {
        this.filters = result;
        this.checkIfShowFilters();
      }

      this.toFilter.emit(this.filters);
    });
  }

  checkIfShowFilters(): void {
    if (this.filters.selectedPhase || this.filters.selectedMonth || this.filters.selectedStatus.some(item => item.active)) {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }
  }

  clearFilters(): void {
    this.setDefaultFiltersValue();
    this.toFilter.emit(this.filters);
  }

  removeFilterItem(type: string, value: string):void {
    if (type === "Status") {
      const statusIndex: number = this.filters.selectedStatus.findIndex(item => item.value === value);
      this.filters.selectedStatus[statusIndex].active = false;
    };

    if (type === "Month") {
      this.filters.selectedMonth = '';
    };

    if (type === "Phase") {
      this.filters.selectedPhase = '';
    };

    this.toFilter.emit(this.filters);
    this.checkIfShowFilters();
  }

  setDefaultFiltersValue(): void {
    this.filters = {
      selectedStatus: this.statusValues.map(item => {
        return {
          value: item,
          active: false
        }
      }),
      selectedPhase: '',
      selectedMonth: ''
    };

    this.checkIfShowFilters();
  }
}
