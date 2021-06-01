import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:string="";
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  sendResetLink(forgotPasswordForm:NgForm){
    document.getElementById("responseDiv").innerText="";
    if(forgotPasswordForm.valid){
      document.getElementById("responseDiv").classList.remove("validation");
      document.getElementById("responseDiv").classList.add("loader");

      this.userService.sendMailForResetPassword(this.email).subscribe(
        fetchedResult=>{
          if(fetchedResult){
            sessionStorage.setItem("isOtpSent",true.toString());
            sessionStorage.setItem("emailForPassword",this.email);
            this.router.navigate(["/resetPasswordLInk"]);
          }
          else{
            document.getElementById("responseDiv").classList.remove("loader");
            document.getElementById("responseDiv").classList.add("validation");
            document.getElementById("responseDiv").innerText="Enter correct information , the email you entered is not registered with us";
          }
        }
      );

    }
  }

}
