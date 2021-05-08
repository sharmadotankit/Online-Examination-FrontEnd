import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';
import { Observable } from 'rxjs';
import { LogInDto } from '../Model/LogInDto';
import { Course } from '../Model/Course';
import { Enrollment } from '../Model/Enrollment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }


  registerUser(user:User):Observable<User>{
    return this.httpClient.post<User>("http://localhost:9090/registeruser",user);
  }

  loginUser(loginDto:LogInDto):Observable<User>{
    return this.httpClient.post<User>("http://localhost:9090/login",loginDto);
  }

  getAllCourses():Observable<Course[]>{
    return this.httpClient.get<Course[]>("http://localhost:9090/getAllCourses");
  }

  getEnrollmentByUserId(userId:number):Observable<Enrollment[]>{
    return this.httpClient.get<Enrollment[]>("http://localhost:9090/getenrollmentofuser?userId="+userId);
  }

  
}
