import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Teilnehmer } from './teilnehmer';

@Injectable({
  providedIn: 'root'
})
export class TeilnehmerService {

baseUrl = '';

  constructor(private http: HttpClient) { }

  getAll(){

    return this.http.get('${this.baseUrl}/list').pipe(
      map((res: any) => {
        return res['data'];
      })
    );

  }
}
