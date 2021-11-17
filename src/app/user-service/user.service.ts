import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebConnectorService } from '../web-connector/web-connector.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token?: string;
  userid?: number;

  constructor(private wcs: WebConnectorService) { }

  isLoggedIn(): boolean{
    return this.token!=undefined && this.userid!=undefined;
  }

  logIn(username: string, password: string): Observable<boolean>{
    this.logOut();
    return new Observable<boolean>((sub) =>
      this.wcs.getUserToken(username, password).subscribe({
        next: (token) => {
          this.token = token;
          if(token!=undefined){
            this.wcs.getUserId(username,token).subscribe({
              next: (id)=>{
                this.userid = id;
                sub.next(this.isLoggedIn());
              },
              error: (error) => {
                sub.next(false); //Verbindungsfehler
              }
            })
          }
          else{
            sub.next(false); //falsches Konto
          }
        },
        error: (error)=>{
          sub.next(false); //Verbindungsfehler
        }
      })
    );
  }

  logOut(){
    this.token = undefined;
  }
}
