import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
        },
        error: (error)=>{
          sub.error(error); //Verbindungsfehler
        },
        complete: () => {
          if(this.token!=undefined){
            this.wcs.getUserId(username,this.token)
            .subscribe({
              next: (id)=>{
                this.userid = id;
              },
              error: (error) => {
                sub.error(error); //Verbindungsfehler
              },
              complete: () => {
                sub.next(this.isLoggedIn());
                sub.complete();
              }
            })//*/
          }
          else{
            sub.next(false); //falsches Konto
            sub.complete();
          }
        }
      })
    );
  }

  logOut(){
    this.token = undefined;
  }
}
