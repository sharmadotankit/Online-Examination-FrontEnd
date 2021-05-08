import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questions = [
    {
      question: "Who invented javascript?",
      a: "Douglas crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich",
      d: "Rasmus Lurdorf",
      correctanswer: "c",
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      a: "Node.js",
      b: "npm",
      c: "typescript",
      d: "js",
      correctanswer: "b",
    },
    {
      question: "Which tool can you use to ensure code quality?",
      a: "ESLint",
      b: "Angular",
      c: "jQuery",
      d: "React",
      correctanswer: "a",
    },
    {
      question: "JavaScript is a ______-side programming language?",
      a: "client",
      b: "Server",
      c: "both",
      d: "none",
      correctanswer: "a",
    },
    {
      question: "Which built-in method calls a function for each element in the array?",
      a: "while()",
      b: "loop()",
      c: "forEach()",
      d: "none",
      correctanswer: "c",
    },
    {
      question: "Which of the following is the correct syntax to print a page using JavaScript?",
      a: "window.print()",
      b: "browser.print()",
      c: "navigator.print()",
      d: "none",
      correctanswer: "a",
    },
    {
      question: "What is the HTML tag under which one can write the JavaScript code?",
      a: "<javascript>",
      b: "<scripted>",
      c: "<script>",
      d: "<js>",
      correctanswer: "c",
    },
    {
      question: "What is the correct file extension for Javascript files?",
      a: ".java",
      b: ".js",
      c: ".javascript",
      d: ".script",
      correctanswer: "b",
    },
    {
      question: "JavaScript language is _____ language.",
      a: "Object-Oriented",
      b: "Object-Based",
      c: "Assembly",
      d: "High-level",
      correctanswer: "b",
    },
    {
      question: "Who invented javascript?",
      a: "Douglas crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich",
      d: "Guido van Rossum",
      correctanswer: "c",
    },
  ];

  questionIndex: number = 0;
  answerMap: Map<Number, String> = new Map();
  score: number = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    //make sure to add guard for back button as after submit u cant go back to test!
    var deadline = new Date().getTime() + 600000;
    var x = setInterval(function () {
      var now = new Date().getTime();
      var t = deadline - now;
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((t % (1000 * 60)) / 1000);
      try{
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
        if (t < 0) {
          clearInterval(x);
          document.getElementById("timer").innerHTML = "Time's Up";
          let answerRadio = document.querySelectorAll(".answer");
          for (let i = 0; i < answerRadio.length; i++) {
            (<HTMLInputElement>answerRadio[i]).disabled = true;
          }
        }
      }
      catch{

      }
    }, 1000);


    (<HTMLInputElement>document.getElementById("previousButton")).disabled = true;
    //code to load first question on page load
    const questionText = document.getElementById("question");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const option4 = document.getElementById("option4");

    questionText.innerText = (this.questionIndex + 1) + ". " + this.questions[0].question;
    option1.innerText = this.questions[0].a;
    option2.innerText = this.questions[0].b;
    option3.innerText = this.questions[0].c;
    option4.innerText = this.questions[0].d;

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
        if (this.answerMap[m][i] == this.questions[m].correctanswer) {
          this.score++;
        }
      }
    }
    console.log(this.score);
    sessionStorage.setItem("scoreForTest", this.score.toString())
    this.router.navigate(['/reportLink']);

  }

  loadQuestion(n: number) {
    const questionText = document.getElementById("question");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const option4 = document.getElementById("option4");

    questionText.innerText = (n + 1) + ". " + this.questions[n].question;
    option1.innerText = this.questions[n].a;
    option2.innerText = this.questions[n].b;
    option3.innerText = this.questions[n].c;
    option4.innerText = this.questions[n].d;

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
