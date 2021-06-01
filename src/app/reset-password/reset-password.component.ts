import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordDto } from '../Model/ResetPasswordDto';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isOtpSent: boolean = sessionStorage.getItem("isOtpSent") == "true" ? true : false;
  resetPasswordDto: ResetPasswordDto = new ResetPasswordDto();
  confirmPassword: string;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (this.isOtpSent == false) {
      this.router.navigate(["/homeLink"])
    }

    this.resetPasswordDto.email = sessionStorage.getItem("emailForPassword");
  }

  resetPassword(resetPasswordForm: NgForm) {
    if (resetPasswordForm.valid) {
      console.log(this.resetPasswordDto);
      this.userService.resetPassword(this.resetPasswordDto).subscribe(
        fetchedResult => {
         document.getElementById("errorDiv").innerHTML=fetchedResult;
        }
      );
    }
    else {
      console.log("not valid form");
    }

  }

}

