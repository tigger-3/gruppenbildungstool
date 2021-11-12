import { Component, OnInit } from '@angular/core';
import {Teilnehmer} from './teilnehmer/teilnehmer';
import {TeilnehmerService} from './teilnehmer/teilnehmer.service';
import {Gruppe} from './gruppe/gruppe';
import { GruppeService } from './gruppe/gruppe.service';



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
    private teilnehmerService: TeilnehmerService,
    private gruppeService: GruppeService
  ) {}

  ngOnInit() {
    this.getTeilnehmer();
    this.getGruppe();
  }

  getGruppe(): void {
    this.gruppeService.getAll().subscribe(
      (data: Gruppe[]) => {
        this.gruppe = data;
        this.success = 'Die Daten wurden erfolgreich geladen';
      },
        (err) => {
          console.log(err);
          this.error =err;
        }
        );
  }

  getTeilnehmer(): void {
    this.teilnehmerService.getAll().subscribe(
      (data: Teilnehmer[]) => {
        this.teilnehmer = data;
        this.success = 'Die Daten wurden erfolgreich geladen';
      },
        (err) => {
          console.log(err);
          this.error =err;
        }
        );
  }

  title = 'gruppenbildungstool';
}
