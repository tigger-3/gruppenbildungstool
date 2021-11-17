import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user-service/user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  message = "nicht versucht"
  percentage = 0;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLogin(username: string, password: string){
    this.percentage = 50;
    this.message = "im Gange"
    this.percentage = 70;
    this.userService.logIn(username,password).subscribe((v)=>{
      if(v){
        this.message = "erfolgreich"
        this.router.navigate(['/list'])
        this.percentage = 100;
      }
      else{this.message = "fehlgeschlagen"}
      this.percentage = 0;

    })
  }

}
