import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectedFilters } from '../filters.component';

interface InputData {
  statusValues: Array<string>;
  phaseValues: Array<string>;
  monthValues: Array<string>;
  filters: SelectedFilters;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  statusValues: Array<string> = [];
  phaseValues: Array<string> = [];
  monthValues: Array<string> = [];

  filters!: SelectedFilters;

  constructor(
    private dialogRef: MatDialogRef<InputData>,
    @Inject(MAT_DIALOG_DATA) private data: InputData,
  ) { }

  ngOnInit(): void {
    this.statusValues = [...this.data.statusValues];
    this.phaseValues = [...this.data.phaseValues];
    this.monthValues = [...this.data.monthValues];
    this.filters = {...this.data.filters};

    console.log('this.filters', this.filters);
  }

  onChangeStatusValue(filterItem: string): void {
    const statusIndex: number = this.filters.selectedStatus.findIndex(item => item.value === filterItem);
    if (statusIndex >= 0) {
      this.filters.selectedStatus[statusIndex].active = !this.filters.selectedStatus[statusIndex].active;
    }
  }

  onChangeSelectedValue(filterItem: string, filterType: 'month' | 'phase'): void {
    if (filterType === 'month') this.filters.selectedMonth = filterItem;
    if (filterType === 'phase') this.filters.selectedPhase = filterItem;
  }
}
