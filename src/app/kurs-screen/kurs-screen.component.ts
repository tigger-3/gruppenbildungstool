import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { Teilnehmer } from '../model/teilnehmer/teilnehmer';
import { UserService } from '../user-service/user.service';
import { WebConnectorService } from '../web-connector/web-connector.service';

@Component({
  selector: 'app-kurs-screen',
  templateUrl: './kurs-screen.component.html',
  styleUrls: ['./kurs-screen.component.scss']
})
export class KursScreenComponent implements OnInit {

  kursid?: number
  kursteilnehmer?: Teilnehmer[];

  constructor(
    private route: ActivatedRoute,
    private wcs: WebConnectorService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) =>
        {
          this.kursid = Number.parseInt(params.get('id')!);
          this.getKursTeilnehmer();
        }
      )
    );
  }

  getKursTeilnehmer(){
    this.wcs.getEnrolledUsers(this.kursid!,this.userService.token!);
  }

}
