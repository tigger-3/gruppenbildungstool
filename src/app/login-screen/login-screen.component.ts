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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLogin(username: string, password: string){
    this.message = "im Gange"
    this.userService.logIn(username,password).subscribe((v)=>{
      if(v){
        this.message = "erfolgreich"
        this.router.navigate(['/list'])
      }
      else{this.message = "fehlgeschlagen"}
    })
  }

}
