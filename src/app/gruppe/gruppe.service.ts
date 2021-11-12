import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Gruppe } from './gruppe';

@Injectable({
  providedIn: 'root'
})
export class GruppeService {

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
