import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../Model/Question';
import { Report } from '../Model/Report';
import { Status } from '../Model/Status';
import { UserService } from '../Service/user.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questions:Question[]=[];
  report:Report= new Report();
  questionIndex: number = 0;
  answerMap: Map<Number, String> = new Map();
  score: number = 0;
  percentage: number = 0;
  x:any;

  constructor(private router: Router,private activatedRoute:ActivatedRoute,private userService:UserService,private locationStrategy: LocationStrategy) {
    this.questions = this.activatedRoute.snapshot.data["questionList"];
   }
  
 
  ngOnInit(): void {
    
    //make sure to add guard for back button as after submit u cant go back to test!
    var deadline = new Date().getTime() + 600000;
     this.x = setInterval(function () {
      var now = new Date().getTime();
      var t = deadline - now;
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((t % (1000 * 60)) / 1000);
      try {
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
        if (t < 0) {
          clearInterval(this.x);
          document.getElementById("timer").innerHTML = "Time's Up";
          let answerRadio = document.querySelectorAll(".answer");
          for (let i = 0; i < answerRadio.length; i++) {
            (<HTMLInputElement>answerRadio[i]).disabled = true;
          }
        }
      }
      catch {

      }
    }, 1000);


    (<HTMLInputElement>document.getElementById("previousButton")).disabled = true;
    //code to load first question on page load
    const questionText = document.getElementById("question");
    const questionNumber = document.getElementById("questionNumber");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const option4 = document.getElementById("option4");

    questionNumber.innerText="Question "+(this.questionIndex+1)+" : ";
    questionText.innerText =this.questions[0].questionText;
    option1.innerText = this.questions[0].option1;
    option2.innerText = this.questions[0].option2;
    option3.innerText = this.questions[0].option3;
    option4.innerText = this.questions[0].option4;

  }


  nextQuestion() {
    this.answerMap[this.questionIndex] = this.getSelectedAnswer();
    console.log(this.answerMap);

    let answers;
    answers = document.querySelectorAll(".answer");
    answers.forEach(element => {
      element.checked = false;
    });

    //To load previous selected answer for next question
    const previousSelectedAnswer = this.answerMap[this.questionIndex + 1];
    answers.forEach(element => {
      if (element.id === previousSelectedAnswer) {
        element.checked = true;
      }
    });


    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
      this.loadQuestion(this.questionIndex);
    }

  }

  previousQuestion() {
    if (this.questionIndex == 9) {
      this.answerMap[this.questionIndex] = this.getSelectedAnswer();
      console.log(this.answerMap);
    }

    if (this.questionIndex > 0) {
      this.questionIndex--;
      this.loadQuestion(this.questionIndex);
    }

    //To load previous selected answer for previous question
    const previousSelectedAnswer = this.answerMap[this.questionIndex];
    let answers;
    answers = document.querySelectorAll(".answer");
    answers.forEach(element => {
      if (element.id === previousSelectedAnswer) {
        element.checked = true;
      }
    });


  }


  getSelectedAnswer() {
    let answer;
    let answers;
    answers = document.querySelectorAll(".answer");
    answers.forEach((currentElement) => {
      if (currentElement.checked) {
        answer = currentElement.id;
      }
    });
    return answer;
  }

  submitTest() {

    clearInterval(this.x);

    if (this.questionIndex == 9) {
      this.answerMap[this.questionIndex] = this.getSelectedAnswer();
      console.log(this.answerMap);
    }

    // console.log("hi");
    for (var m in this, this.answerMap) {
      if (this.answerMap[m] == undefined) {
        this.answerMap[m] = "z";
      }
    }

    for (var m in this.answerMap) {
      for (var i = 0; i < this.answerMap[m].length; i++) {
        if (this.answerMap[m][i] == this.questions[m].correctOption) {
          this.score++;
        }
      }
    }

    this.percentage = (this.score / this.questions.length) * 100;

    this.report.enrollment=JSON.parse(sessionStorage.getItem("enrollmentOfUserForCourse"));
    // console.log(this.report.enrollment);
    this.report.score=this.percentage;
   
    if(this.percentage>=70){
      this.report.status=Status.PASSED;
      this.report.levelPassed=this.report.enrollment.levelOfUser+1;
    }
    else{
      this.report.status=Status.FAILED;
      this.report.levelPassed=this.report.enrollment.levelOfUser;
    }

   sessionStorage.setItem("generatedReport",JSON.stringify(this.report));
    console.log(this.report);
    // console.log("This is level passed "+this.report.levelPassed);
    // console.log("This is level of user "+this.report.enrollment.levelOfUser);
    
    this.router.navigate(['/reportLink']);

  }

  loadQuestion(n: number) {
    const questionText = document.getElementById("question");
    const questionNumber = document.getElementById("questionNumber");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const option4 = document.getElementById("option4");

    questionNumber.innerText="Question "+(this.questionIndex+1)+" : ";
    questionText.innerText =this.questions[n].questionText;
    option1.innerText = this.questions[n].option1;
    option2.innerText = this.questions[n].option2;
    option3.innerText = this.questions[n].option3;
    option4.innerText = this.questions[n].option4;

    if (this.questionIndex == 9) {
      (<HTMLInputElement>document.getElementById("nextButton")).disabled = true;
    }
    else {
      (<HTMLInputElement>document.getElementById("nextButton")).disabled = false;
    }

    if (this.questionIndex == 0) {
      (<HTMLInputElement>document.getElementById("previousButton")).disabled = true;
    }
    else {
      (<HTMLInputElement>document.getElementById("previousButton")).disabled = false;
    }
  }
}
