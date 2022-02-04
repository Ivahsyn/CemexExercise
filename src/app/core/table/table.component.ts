import { Component, Input } from '@angular/core';
import { RequestedData } from 'src/app/shared/interfaces/requested-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: Array<RequestedData> = [];
  @Input() tableheader: Array<string> = [];

  constructor() { }
}
