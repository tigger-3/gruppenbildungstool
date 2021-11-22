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
    this.userService.logOut();
  }

  submitLogin(username: string, password: string){
    this.percentage = 50;
    this.message = "im Gange"
    this.percentage = 70;
    this.userService.logIn(username,password).subscribe(
      {
        next: (v)=>{
        },
        error: (error) => {
          if(error.type=='invalidlogin'){
            this.message = `fehlgeschlagen - Ungültiger Benutzer oder Passwort!`
          }
          else{
            this.message = `fehlgeschlagen - Fehlercode: ${error.type} - Fehlernachricht: ${error.message}`
          }
          this.percentage = 0;
        },
        complete: () => {
          this.message = "erfolgreich"
          this.router.navigate(['/list'])
          this.percentage = 100;
        }
      }
    )
  }

}
