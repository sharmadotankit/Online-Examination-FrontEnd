import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Question } from "../Model/Question";
import { UserService } from "../Service/user.service";

@Injectable()
export class questionListResoverService implements Resolve<Question[]>{
    constructor(private userService:UserService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Question[] | Observable<Question[]> | Promise<Question[]> {
       let examId = Number(sessionStorage.getItem("examIdForTest"));
       return this.userService.getQuestionsByExamid(examId);
    }
}