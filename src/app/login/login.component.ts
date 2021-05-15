import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInDto } from '../Model/LogInDto';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInInfo: LogInDto = new LogInDto();

  constructor(private userService: UserService, private router: Router) { }


  ngOnInit(): void {
  }


  loginUser(loginForm: NgForm) {
    if (loginForm.invalid) {
      document.getElementById("errorDiv").innerHTML = "Please enter valid credentials"
    }
    else if (loginForm.valid) {
      if (this.logInInfo.userEmail == "Ankit@gmail.com" && this.logInInfo.password == "Ankit@123") {
        sessionStorage.setItem("userId", "9");
        this.router.navigate(["adminDashBoardLink"]).then(()=>{
          window.location.reload();
        });
      }
      else {
        this.userService.loginUser(this.logInInfo).subscribe(
          fetchedUser => {
            if (fetchedUser == null) {
              document.getElementById("errorDiv").innerHTML = "You have entered wrong credentials"
            }
            else {
              console.log(fetchedUser);
              sessionStorage.setItem("userId", fetchedUser.userId.toString());
              this.router.navigate(['/homeLink']).then(() => {
                window.location.reload();
              })
            }
          }
        );
      }

    }
    else {
      document.getElementById("errorDiv").innerHTML = "Please enter valid credentials"
    }
  }

}
