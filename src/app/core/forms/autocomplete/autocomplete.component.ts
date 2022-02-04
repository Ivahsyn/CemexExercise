import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @Input() options: Array<string> = [];
  @Output() onvalueChange: EventEmitter<string> = new EventEmitter<string>();

  autocompleteControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onValueChanged(): void {
    this.onvalueChange.emit(this.autocompleteControl.value);
  }
}
