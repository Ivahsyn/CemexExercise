import { Component, Input, OnChanges } from '@angular/core';
import { RequestedData } from 'src/app/shared/interfaces/requested-data';

interface Color {
  color: string;
  status: string;
}

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnChanges {
  @Input() item!: RequestedData;

  colors: Array<Color> = [{
      color: '#7bca41', 
      status: 'Active'
    },{
      color: '#3caaf5', 
      status: 'Pending Approval'
    },{
      color: '#fbb237', 
      status: 'Waiting Compensation'
    }
  ];

  currentColor: string = '';

  constructor() { }

  ngOnChanges():void {
    if (this.item) {
      this.currentColor = this.colors.find(item => item.status === this.item.status)?.color || '';
    }
  }
}
