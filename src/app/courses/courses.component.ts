import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../Model/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:Course[];
  constructor(private router:Router) { }
  ngOnInit(): void {

    this.courses=[
      {
        courseId:1001,
        courseName:"C++",
        imagePath:"../assets/courses/C++.png"
      },
      {
        courseId:1002,
        courseName:"Java",
        imagePath:"../assets/courses/Java.png"
      },
      {
        courseId:1004,
        courseName:"Python",
        imagePath:"../assets/courses/Python.png"
      },
      {
        courseId:1003,
        courseName:"C#",
        imagePath:"../assets/courses/Csharp.png"
      },
    ];

  }

  goToInstruction(){
    this.router.navigate(['instructionLink']);
  }

}
