import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Report } from "../Model/Report";
import { UserService } from "../Service/user.service";

@Injectable()
export class ResultResolverService implements Resolve<Report>{
    constructor(private userService:UserService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Report | Observable<Report> | Promise<Report> {
        let report  = JSON.parse(sessionStorage.getItem("generatedReport"));
        return this.userService.generateReport(report);
    }

}