import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebConnectorService } from '../web-connector/web-connector.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token?: string;

  constructor(private wcs: WebConnectorService) { }

  isLoggedIn(): boolean{
    return this.token!=undefined;
  }

  logIn(username: string, password: string): Observable<boolean>{
    this.logOut();
    return new Observable<boolean>((sub) =>
      this.wcs.getUserToken(username, password).subscribe((token) => {
        this.token = token;
        sub.next(this.isLoggedIn());
      })
    );
  }

  logOut(){
    this.token = undefined;
  }
}
