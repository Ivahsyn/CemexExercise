import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: Array<string> = [];
  @Input() title: string = '';
  @Input() selected: string = '';
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onChangeValue(): void {
    this.changeEvent.emit(this.selected ? this.selected : '');
  }
}
