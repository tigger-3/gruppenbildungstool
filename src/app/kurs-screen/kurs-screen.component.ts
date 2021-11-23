import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Gruppe } from '../model/gruppe/gruppe';
import { Teilnehmer } from '../model/teilnehmer/teilnehmer';
import { UserService } from '../user-service/user.service';
import { WebConnectorService } from '../web-connector/web-connector.service';
import { Location } from '@angular/common'
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-kurs-screen',
  templateUrl: './kurs-screen.component.html',
  styleUrls: ['./kurs-screen.component.scss']
})
export class KursScreenComponent implements OnInit {

  kursid?: number
  kursteilnehmer: Teilnehmer[] = [];

  grouping: string = "";

  gruppen: Gruppe[] = [];

  errormsg: string = "";
  errorsource: string = "";
  groupingError: boolean = false;

  selectedTab = 0;

  @Input() gruppenanzahl!: number;
  @Input() gruppengroesse!: number;

  //@Output() gruppenanzahlChange = new EventEmitter<number>();
  //@Output() gruppengroesseChange = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private wcs: WebConnectorService,
    private userService: UserService,
    private cfg: ConfigService,
    private router: Router,
    private location: Location
    ) {
      this.gruppenanzahl = 1;
      this.gruppengroesse = 1;
    }

  ngOnInit(): void {
    this.kursid = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getKursTeilnehmer();
    this.grouping = `GA ${new Date(Date.now()).toLocaleDateString()}`;
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
      this.gruppen.push({name: `Gruppe ${i+1} (${new Date(Date.now()).toLocaleDateString()})`, members:[]})
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
    this.resetError()
    let groupingid = 0;
    this.wcs.createGrouping(this.userService.token!,this.kursid!,this.grouping,'')
    .subscribe({
      next: (id)=>{groupingid = id},
      error: (error)=>{
        if(error.type=='invalidparameter'){
          this.errormsg = "Der Name der Gruppenarbeit darf weder leer sein, noch den Namen von bereits bestehenden Gruppenarbeiten entsprechen!"
        }
        else if(error.type=='invalidresponse'){
          this.sendGroupsAfterGroupingCreated()
        }
      },
      complete: ()=>{
        this.sendGroupsAfterGroupingCreated(groupingid)
      }
    })
  }
  private sendGroupsAfterGroupingCreated(groupingid?:number){
    let groupsToGo = this.gruppen.length
    let hasFailed = false;
    let groupsCompleted: Gruppe[] = [];
    this.gruppen.forEach((group) =>
          this.wcs.createGroup(this.userService.token!,this.kursid!,group.name,'').subscribe(
            {
              next: (id)=>group.id=id,
              error: (error)=>{
                if(error.type=='invalidparameter'){
                  this.errormsg = "Die Gruppennamen dürfen weder leer sein, noch den Namen von bereits bestehenden Gruppen entsprechen!"
                  hasFailed=true;
                  groupsCompleted.forEach((revgroup)=>this.revertGroup(revgroup));
                  if(groupingid){
                    this.revertGrouping(groupingid)
                  }
                  else{
                    this.groupingError = true;
                  }
                }
              },
              complete: ()=>{
                // //Gruppierung assignen
                if(groupingid){this.wcs.assignGrouping(this.userService.token!,groupingid,group.id!)} //funktioniert bei Testmoodle nicht
                //Gruppenmitglieder hinzufügen
                  group.members.forEach((member)=>{
                    this.wcs.addGroupMembers(this.userService.token!,group.id!,member.id).subscribe({
                      error: (error)=>{let temp = error}
                    })
                  })

                  if(!hasFailed){
                    groupsCompleted.push(group)
                  }
                  else{
                    this.revertGroup(group)
                  }
                  if(--groupsToGo==0){this.router.navigate(['/complete', this.kursid!])}
              }
            }
          )
        )
  }

  getGroupingPage(){
    return `${this.cfg.moodle_address}/group/groupings.php?id=${this.kursid}`
  }
  getGroupPage(){
    return `${this.cfg.moodle_address}/group/index.php?id=${this.kursid}`
  }

  revertGroup(group: Gruppe){
    this.wcs.deleteGroup(this.userService.token!, group.id!);
  }

  revertGrouping(groupingId: number){
    this.wcs.deleteGrouping(this.userService.token!, groupingId);
  }

  resetError(){
    this.errormsg="";
    this.errorsource="";
    this.groupingError=false;
  }

  zurueck(){
    if(this.selectedTab==1){
      this.selectedTab=0;
    }
    else{
      this.location.back();
    }
  }

}
