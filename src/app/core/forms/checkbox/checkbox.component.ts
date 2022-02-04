import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() item: string = '';
  @Input() selected: boolean = false;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onChangeValue(): void {
    this.changeEvent.emit(this.item);
  }
}
