import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../Model/Course";
import { UserService } from "../Service/user.service";

@Injectable()
export class CourseListResolverService implements Resolve<Course[]>{
    constructor(private userService:UserService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]> {
        return this.userService.getAllCourses();
    }
}