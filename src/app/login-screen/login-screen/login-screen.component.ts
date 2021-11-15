import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user-service/user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  constructor(userService: UserService) { }

  ngOnInit(): void {
  }

}
