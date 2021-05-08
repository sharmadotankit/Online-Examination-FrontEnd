import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  isPass: boolean;
  constructor() { }

  ngOnInit(): void {
    const score = Number(sessionStorage.getItem("scoreForTest"));
    if (score >= 7) {
      this.isPass = true;
    }
    else {
      this.isPass = false;
    }
  }


}
