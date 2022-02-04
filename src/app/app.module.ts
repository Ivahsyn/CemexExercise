import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BodyComponent } from './core/body/body.component';
import { FooterComponent } from './core/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { TableComponent } from './core/table/table.component';
import { RowComponent } from './core/table/row/row.component';
import { CellComponent } from './core/table/row/cell/cell.component';
import { TableHeaderComponent } from './core/table/table-header/table-header.component';
import { FiltersComponent } from './core/filters/filters.component';
import { PopupComponent } from './core/filters/popup/popup.component';
import { CheckboxComponent } from './core/forms/checkbox/checkbox.component';
import { SelectComponent } from './core/forms/select/select.component';
import { FilterItemComponent } from './core/filters/filter-item/filter-item.component';
import { AutocompleteComponent } from './core/forms/autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    TableComponent,
    RowComponent,
    CellComponent,
    TableHeaderComponent,
    FiltersComponent,
    PopupComponent,
    CheckboxComponent,
    SelectComponent,
    FilterItemComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
