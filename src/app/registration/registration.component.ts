import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user:User= new User();
  confirmPassword:string;
  minDate:Date = new Date();
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(registrationForm:NgForm){
    if(registrationForm.invalid){
      document.getElementById("errorDiv").innerHTML="Please enter valid data";
    }
    else if(this.confirmPassword!=this.user.password){
      document.getElementById("errorDiv").innerHTML="Password and Confirm password do not match";
    }
    else if(registrationForm.valid){
      document.getElementById("errorDiv").innerHTML="";
      this.userService.registerUser(this.user).subscribe(
        fetchedUser=>{
          if(fetchedUser==null){
            document.getElementById("errorDiv").innerHTML="Email already registered! If you dont remember your password try 'Forgot Password' option to reset your password ";
          }
          else{
            console.log(fetchedUser);
            this.router.navigate(['/homeLink']);
          }  
        }
      );
    }
    else{
      document.getElementById("errorDiv").innerHTML="Please enter valid data";
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
}
