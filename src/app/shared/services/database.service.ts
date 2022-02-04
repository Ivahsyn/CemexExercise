import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestedData } from '../interfaces/requested-data';
import DB from './database.json';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getData(): Observable<Array<RequestedData>> {
    return of(DB.values);
  }
}
