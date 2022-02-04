import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface FilterItem {
  type: string;
  value: string;
}

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent {
  @Input() item!: FilterItem;
  @Output() removeFilterItem: EventEmitter<FilterItem> = new EventEmitter<FilterItem>();

  constructor() { }

  onRemove(): void {
    this.removeFilterItem.emit(this.item);
  }
}
