import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class WebConnectorService {

  baseUrl: string;
  universalToken: string;
  serviceShortname: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    const baseUrl = config.moodle_address;
    this.baseUrl = baseUrl ? baseUrl : "";

    const universalToken = config.webservice_token;
    this.universalToken = universalToken ? universalToken : "";

    const serviceShortname = config.service_shortname;
    this.serviceShortname = serviceShortname ? serviceShortname : "";
  }

  getUserToken(username: string, password: string){
    return this.http.post(
      `${this.baseUrl}/login/token.php`,
      `username=${username}&password=${password}&service=${this.serviceShortname}`,
      {'headers':{'Accept':'application/json','Content-type':'application/x-www-form-urlencoded'}}
    ).pipe(
      map((res: any) => {
        return res['token']
      })
    )
  }

  // getAll(){

  //   return this.http.get('${this.baseUrl}/list').pipe(
  //     map((res: any) => {
  //       return res['data'];
  //     })
  //   );

  // }
}
