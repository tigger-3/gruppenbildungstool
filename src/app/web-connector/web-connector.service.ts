import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class WebConnectorService {

  baseUrl: string;
  universalToken: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    const baseUrl = config.moodle_address;
    this.baseUrl = baseUrl ? baseUrl : "";

    const universalToken = config.webservice_token;
    this.universalToken = universalToken ? universalToken : "";

  }

  // getAll(){

  //   return this.http.get('${this.baseUrl}/list').pipe(
  //     map((res: any) => {
  //       return res['data'];
  //     })
  //   );

  // }
}
