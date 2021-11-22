import { Component, OnInit } from '@angular/core';
import { WebConnectorService } from './web-connector/web-connector.service';
import { Observable } from 'rxjs';
import { Teilnehmer } from './model/teilnehmer/teilnehmer';
import { Gruppe } from './model/gruppe/gruppe';
import { UserService } from './user-service/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  teilnehmer: Teilnehmer[] = [];
  gruppe: Gruppe[] = [];
  error = '';
  success = '';

  token = "";

  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor(
    private wcs: WebConnectorService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getToken();
  }

  getToken(){
    this.wcs.getUserToken("test", "P4$$w0rd").subscribe(
      (output) => {
        this.token = output
      }
    );
  }

  isLoggedIn(){
    return this.userService.isLoggedIn()
  }

  title = 'gruppenbildungstool';
}
