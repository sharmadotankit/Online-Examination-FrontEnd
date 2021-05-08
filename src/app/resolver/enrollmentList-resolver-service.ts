import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Enrollment } from "../Model/Enrollment";
import { UserService } from "../Service/user.service";

@Injectable()
export class EnrollmentListResolverService implements Resolve<Enrollment[]>{
    constructor(private userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Enrollment[]> {
        let userId = Number(sessionStorage.getItem("userId"));
        if(userId!=0){
            return this.userService.getEnrollmentByUserId(userId);
        }
        else{
            return ;
        }
           
    }

}