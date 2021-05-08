import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showDiv(divId:string){
    if(divId!="addQuestionDiv"){
      document.getElementById("addQuestionDiv").style.display="none";
    }
    if(divId!="removeQuestionDiv"){
      document.getElementById("removeQuestionDiv").style.display="none";
    }
    if(divId!="viewReportDiv"){
      document.getElementById("viewReportDiv").style.display="none";
    }
    
    document.getElementById("welcomeAdminDiv").style.display="none";

    let selectedDiv = document.getElementById(divId);
    selectedDiv.style.display="block";

  }

}