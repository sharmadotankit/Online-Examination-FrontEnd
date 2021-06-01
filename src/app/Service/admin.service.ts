import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Report } from "../Model/Report";
import { Question } from "../Model/Question";

@Injectable({
    providedIn: 'root'
  })
export class AdminService {
  constructor(private httpClient:HttpClient){}

  getAllReports():Observable<Report[]>{
    return this.httpClient.get<Report[]>("http://localhost:9090/viewreports");
  }

  getQuestionByCourseNameAndLevel(courseName:string,level:number):Observable<Question[]>{
    return this.httpClient.get<Question[]>("http://localhost:9090/getquestionbycoursenameandlevel?courseName="+encodeURIComponent(courseName)+"&level="+level);
  }

  addQuestion(questionObj:Question,courseName:string,level:number):Observable<Question>{
    return this.httpClient.post<Question>("http://localhost:9090/addquestion?courseName="+courseName+"&level="+level,questionObj);
  }
  

  removeQuestion(questionId:number):Observable<boolean>{
    return this.httpClient.put<boolean>("http://localhost:9090/removequestionbyquestionid?questionId="+questionId,null);
    }
}