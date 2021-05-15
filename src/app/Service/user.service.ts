import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';
import { Observable } from 'rxjs';
import { LogInDto } from '../Model/LogInDto';
import { Course } from '../Model/Course';
import { Enrollment } from '../Model/Enrollment';
import { Question } from '../Model/Question';
import { Report } from '../Model/Report';
import { EnrollmentListResolverService } from '../resolver/enrollmentList-resolver-service';

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

  enrollUserToACourse(userId:number,courseId:number):Observable<Enrollment>{
    return this.httpClient.post<Enrollment>("http://localhost:9090/enroll?userId="+userId+"&courseId="+courseId,null);
  }


  getEnrollmentByUserIdAndCourseId(userId:number,courseId:number):Observable<Enrollment>{
    return this.httpClient.get<Enrollment>("http://localhost:9090/getenrollmentbyuseridandcourseid?userId="+userId+"&courseId="+courseId);
  }

  getExamIdByCourseIdAndLevel(courseId:number, level:number):Observable<number>{
    return this.httpClient.get<number>("http://localhost:9090/getexamidbycourseidandlevel?courseId="+courseId+"&level="+level);
  }

  getQuestionsByExamid(examId:number):Observable<Question[]>{
    return this.httpClient.get<Question[]>("http://localhost:9090/getquestionsforexamid?examId="+examId);
  }

  generateReport(report:Report):Observable<Report>{
    return this.httpClient.post<Report>("http://localhost:9090/generatereport",report);
  }

  updateLevelOfAUser(enrollment:Enrollment):Observable<Enrollment>{
    return this.httpClient.put<Enrollment>("http://localhost:9090/updatelevelofuser",enrollment);
  }
}
