import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { Kurs } from '../model/kurs/kurs';

@Injectable({
  providedIn: 'root'
})
export class WebConnectorService {

  baseUrl: string;
  serviceShortname: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    const baseUrl = config.moodle_address;
    this.baseUrl = baseUrl ? baseUrl : "";

    const serviceShortname = config.service_shortname;
    this.serviceShortname = serviceShortname ? serviceShortname : "";
  }

  private sendApiRequest(wsfunction: string, wstoken: string, payload?: string){
    return this.http.post(
      `${this.baseUrl}/webservice/rest/server.php`,
      `moodlewsrestformat=json&wsfunction=${wsfunction}&wstoken=${wstoken}`+ (payload ? (`&` + payload) : ``),
      {'headers':{'Accept':'application/json','Content-type':'application/x-www-form-urlencoded'}}
    )
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

  getUserId(username: string, token: string){
    return this.sendApiRequest(
      "core_user_get_users",
      token,
      `criteria[0][key]=username&criteria[0][value]=${username}`
    ).pipe(
      map((res: any) => {
        return res['users'][0]['id']
      })
    )
  }

  getUsersCourses(userid: number, token: string){
    return this.sendApiRequest(
      "core_enrol_get_users_courses",
      token,
      `userid=${userid}`
    ).pipe(
      map((res: any) => {
        const kursliste: Kurs[] = [];
        res.forEach((singleKursResponse: any) => {
          kursliste.push({id:singleKursResponse['id'],shortname:singleKursResponse['shortname'],fullname:singleKursResponse['fullname']})
        });
        return kursliste;
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
