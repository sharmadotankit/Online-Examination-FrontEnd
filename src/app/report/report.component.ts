import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Report } from '../Model/Report';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportOfUser:Report=new Report();
  isPass: boolean;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private userService:UserService) {
    this.reportOfUser = this.activatedRoute.snapshot.data["report"];
   }

  ngOnInit(): void {
    

    if (this.reportOfUser.score>=70) {
      this.isPass = true;
    }
    else {
      this.isPass = false;
    }
    console.log(this.reportOfUser);
  
    console.log(this.isPass);

  }

  

  public printCertificate() {
    var data = document.getElementById('printCertificate');
    html2canvas(data, { scrollY: -window.scrollY, scale: 1 }).then(canvas => {
      
      var imgWidth = 800;

      var imgHeight = (canvas.height * imgWidth / canvas.width)+150;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'mm', 'a1');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('certificate.pdf'); 
    });
  }

  goBackToTestForSameExam(){
    this.router.navigate(["takeTestLink"]);
  }

  goForNextLevel(){
    if(this.reportOfUser.enrollment.levelOfUser>=3){
      var modal = document.getElementById("testClear");
      modal.style.display = "block";
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
    else{
      this.userService.getExamIdByCourseIdAndLevel(this.reportOfUser.enrollment.course.courseId,this.reportOfUser.enrollment.levelOfUser+1).subscribe(
        fetchedExamId=>{
          console.log(fetchedExamId);
          sessionStorage.setItem("examIdForTest",fetchedExamId.toString());
        }
      );
  
      this.router.navigate(["instructionLink"]);
    }
    
  }

  
  closeModal() {
    var modal1 = document.getElementById("testClear");
    modal1.style.display = "none";
  }


}
