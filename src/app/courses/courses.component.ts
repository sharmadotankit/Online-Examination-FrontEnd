import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../Model/Course';
import { Enrollment } from '../Model/Enrollment';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loggedInUserId: number = 0;
  isLoggedIn: boolean = false;
  count: number = 0;
  enrollmentOfUser: Enrollment[] = [];
  isAlreadyEnrolled: Set<number> = new Set();
  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.courses = this.activatedRoute.snapshot.data['courseList'];
    for (let c of this.courses) {
      if (c.courseName == "C#") {
        c.imagePath = "assets/courses/Csharp.png";
      }
      else {
        c.imagePath = "assets/courses/" + c.courseName + ".png";
      }

    }


    this.enrollmentOfUser = this.activatedRoute.snapshot.data["enrollmentList"];
    try{
      for (let e of this.enrollmentOfUser) {
        this.isAlreadyEnrolled.add(e.course.courseId);
      }
    }
    catch{
      
    }
    


  }
  ngOnInit(): void {
    
  }

  enrollUserToACourse() {

  }


  goToInstruction() {
    this.router.navigate(['instructionLink']);
  }

}
