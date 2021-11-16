import { Component, OnInit } from '@angular/core';
import { WebConnectorService } from './web-connector/web-connector.service';
import { Observable } from 'rxjs';
import { Teilnehmer } from './model/teilnehmer/teilnehmer';
import { Gruppe } from './model/gruppe/gruppe';



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
    private wcs: WebConnectorService
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

  title = 'gruppenbildungstool';
}
