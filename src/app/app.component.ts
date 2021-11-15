import { Component, OnInit } from '@angular/core';
import {Teilnehmer} from './teilnehmer/teilnehmer';
import {Gruppe} from './gruppe/gruppe';



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

  constructor(
  ) {}

  ngOnInit() {
  }

  title = 'gruppenbildungstool';
}
