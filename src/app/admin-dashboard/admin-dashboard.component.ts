import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../Model/Question';
import { Report } from '../Model/Report';
import { Status } from '../Model/Status';
import { AdminService } from '../Service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  allReports: Report[] = [];
  filteredReports: Report[] = this.allReports;
  courseNameToFilter: string;
  statusToFilter: Status;
  levelToFilter: number;
  questionsList:Question[]=[];
  addQuestionObj:Question= new Question();

  constructor(private router: Router, private adminService: AdminService) { }


  ngOnInit(): void {
    
  }

  showDiv(divId: string) {
    this.courseNameToFilter="";
    this.levelToFilter=null;
    if (divId != "addQuestionDiv") {
      document.getElementById("addQuestionDiv").style.display = "none";
    }
    if (divId != "removeQuestionDiv") {
      document.getElementById("removeQuestionDiv").style.display = "none";
    }
    if (divId != "viewReportDiv") {
      document.getElementById("viewReportDiv").style.display = "none";
    }

    document.getElementById("welcomeAdminDiv").style.display = "none";

    let selectedDiv = document.getElementById(divId);
    selectedDiv.style.display = "block";

  }

  viewAllReports() {
    this.adminService.getAllReports().subscribe(
      fetchedReports => {
        this.allReports = fetchedReports;
        this.filteredReports = fetchedReports;
        console.log(fetchedReports)
      }
    );
  }


  filterReportsByCondition() {
    this.filteredReports = this.allReports.filter(
      res => {
        if (res.enrollment.course.courseName == this.courseNameToFilter && res.status == this.statusToFilter && res.levelPassed == this.levelToFilter) {
          return res;
        }

      }
    );

    if (this.filteredReports.length == 0) {
      document.getElementById("errorDiv").innerHTML = "No reports found";
    }
    else {
      document.getElementById("errorDiv").innerHTML = this.filteredReports.length + "  reports found";
    }
  }


  findQuestion() {
    
    this.adminService.getQuestionByCourseNameAndLevel(this.courseNameToFilter.toString(),this.levelToFilter).subscribe(
      fetchedQuestion=>{
       this.questionsList=fetchedQuestion;
      }
    );
  }

  clearOldQuestion(){
    this.questionsList=[];
  }

  addQuestion(){
    console.log(this.addQuestionObj);
    console.log(this.courseNameToFilter)
    console.log(this.levelToFilter);
    this.adminService.addQuestion(this.addQuestionObj,this.courseNameToFilter,this.levelToFilter).subscribe(
      fetchedQuestion=>{
        console.log(fetchedQuestion);
        if(fetchedQuestion!=null){
          document.getElementById("resultDivAdd").innerHTML="Question Added!!";
        }
        else{
          document.getElementById("resultDivAdd").innerHTML="Question could not be added.";
        }
      }
    );

    this.courseNameToFilter="";
    this.levelToFilter=null;
    Object.keys(this.addQuestionObj).forEach(key => this.addQuestionObj[key]=null);

  }

  removeQuestion(questionId:number){
    console.log(questionId);
    this.adminService.removeQuestion(questionId).subscribe(
      fetchedResult=>{
        if(fetchedResult==true){
          document.getElementById("resultDiv").innerHTML="Question removed!!";
        }
        else{
          document.getElementById("resultDiv").innerHTML="Question could not be removed!!";
        }
        this.findQuestion();
      }
    );
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/homeLink']).then(() => {
      window.location.reload();
    });
  }

}
