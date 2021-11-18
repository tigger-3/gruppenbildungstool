import { Component, OnInit } from '@angular/core';
import { Kurs } from '../model/kurs/kurs';
import { UserService } from '../user-service/user.service';
import { WebConnectorService } from '../web-connector/web-connector.service';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.scss']
})
export class ListScreenComponent implements OnInit {

  kurse: Kurs[];

  constructor(private userService: UserService, private wcs: WebConnectorService) { this.kurse = [] }

  ngOnInit(): void {
    this.recallKurse()
  }

  getToken(){
    return this.userService.token;
  }

  recallKurse(){
    const userid = this.userService.userid?this.userService.userid:0;
    const token = this.userService.token?this.userService.token:"";
    this.wcs.getUsersCourses(userid,token).subscribe({
      next: (kurse) =>
        this.kurse=kurse,
      error: (error) => {},
      complete: () => {}
    })
  }

}
