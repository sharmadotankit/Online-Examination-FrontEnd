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
    console.log(this.courses);

    for (let c of this.courses) {
      if (c.courseName == "C#") {
        c.imagePath = "assets/courses/Csharp.png";
      }
      else {
        c.imagePath = "assets/courses/" + c.courseName + ".png";
      }
    }

    this.enrollmentOfUser = this.activatedRoute.snapshot.data["enrollmentList"];
    try {
      for (let e of this.enrollmentOfUser) {
        this.isAlreadyEnrolled.add(e.course.courseId);
      }
    }
    catch {
    }



  }


  ngOnInit(): void {
    this.loggedInUserId = Number(sessionStorage.getItem("userId"));
    this.isAlreadyEnrolled=this.isAlreadyEnrolled;
  }



  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var modal1 = document.getElementById("testClear");
    modal1.style.display = "none";
  }

  enrollUserToACourse(courseId: number) {
    console.log("USer id of User : "+this.loggedInUserId);
    console.log("Course Id to which user enrolled : "+courseId);
    if (this.loggedInUserId != 0) {
      this.userService.enrollUserToACourse(this.loggedInUserId, courseId).subscribe(
        fetchedEnrollment => {
          console.log("this is enrollment of a course which the user enrolled just now : "+ JSON.stringify(fetchedEnrollment));
          window.location.reload();
        }
      );
    }
    else {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }





  goToInstruction(courseId: number) {
    this.userService.getEnrollmentByUserIdAndCourseId(this.loggedInUserId, courseId).subscribe(
      fetchedEnrollment => {
        sessionStorage.setItem("enrollmentOfUserForCourse",JSON.stringify(fetchedEnrollment))
        if (fetchedEnrollment.levelOfUser >= 3) {
          var modal = document.getElementById("testClear");
          modal.style.display = "block";
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
        }
        else {
          this.userService.getExamIdByCourseIdAndLevel(fetchedEnrollment.course.courseId, fetchedEnrollment.levelOfUser + 1).subscribe(
            fetchedExamId => {
              console.log(fetchedEnrollment.course.courseId+ " "+ (fetchedEnrollment.levelOfUser + 1));
              console.log(" This is exam id for the course and level of User : "+fetchedExamId);
              sessionStorage.setItem("examIdForTest", fetchedExamId.toString());
            }
          );
    
          this.router.navigate(["instructionLink"]);
        }
      }
    );

   


  }

}
