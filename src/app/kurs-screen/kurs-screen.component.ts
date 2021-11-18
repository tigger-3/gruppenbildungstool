import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Gruppe } from '../model/gruppe/gruppe';
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
  kursteilnehmer: Teilnehmer[] = [];

  gruppen: Gruppe[] = [];

  selectedTab = 0;

  @Input() gruppenanzahl!: number;
  @Input() gruppengroesse!: number;

  //@Output() gruppenanzahlChange = new EventEmitter<number>();
  //@Output() gruppengroesseChange = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private wcs: WebConnectorService,
    private userService: UserService
    ) {
      this.gruppenanzahl = 1;
      this.gruppengroesse = 1;
    }

  ngOnInit(): void {
    this.kursid = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getKursTeilnehmer();
  }

  getKursTeilnehmer(){
    this.wcs.getEnrolledUsers(this.kursid!,this.userService.token!, ['student']).subscribe(
      {
        next: (teilnehmerliste) => {
          this.kursteilnehmer = teilnehmerliste
          if(teilnehmerliste.length >= 2){
            this.gruppenanzahl = 2;
            this.gruppengroesse = Math.ceil(teilnehmerliste.length / 2)
          }
        }
      }
    );
  }

  generateGroups(){
    this.gruppen = []
    for(let i = 0; i < this.gruppenanzahl; i++){
      this.gruppen.push({name: `Gruppe ${i+1}`, members:[]})
    }
    this.kursteilnehmer.forEach((teilnehmer)=>{
      let gruppeFound = false
      while(!gruppeFound){
        let gruppeNo = Math.floor(Math.random()*this.gruppen.length);
        if(this.gruppen[gruppeNo].members.length < this.gruppengroesse){
          this.gruppen[gruppeNo].members.push(teilnehmer);
          gruppeFound = true;
        }
      }
    })
    this.selectedTab = 1;
  }

  areGroupsGenerated(): boolean {
    return this.gruppen.length > 0
  }

  gruppenanzahlChanged(newcount: number){
    this.gruppenanzahl = newcount;
    let tempgroesse = Math.ceil(this.kursteilnehmer.length / this.gruppenanzahl);
    if(tempgroesse > this.gruppengroesse){
      this.gruppengroesse = tempgroesse;
      //this.gruppengroesseChange.emit(tempgroesse);
    }
  }

  gruppengroesseChanged(newsize: number){
    this.gruppengroesse = newsize;
    let tempanzahl = Math.ceil(this.kursteilnehmer.length / this.gruppengroesse);
    if(tempanzahl > this.gruppenanzahl){
      this.gruppenanzahl = tempanzahl;
      //this.gruppenanzahlChange.emit(tempanzahl);
    }
  }

  getGruppenkarteClass(gruppe: Gruppe): string{
    if(gruppe.members && gruppe.members.length>0){
      return "active"
    }
    else{
      return "inactive"
    }
  }

  sendGroupsToMoodle(){
    this.gruppen.forEach((group) =>
      this.wcs.createGroup(this.userService.token!,this.kursid!,group.name,'').subscribe(
         {
           next: (id)=>group.id=id,
           //error: (error)=>{},
           complete: ()=>{
             group.members.forEach((member)=>{
               this.wcs.addGroupMembers(this.userService.token!,group.id!,member.id)
             })
           }
         }
      )
    )
    //TODO redirect to moodle
  }

}
