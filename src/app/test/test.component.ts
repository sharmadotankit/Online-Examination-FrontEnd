import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questions = [
    {
      question: "Who invented javascript?",
      options: {
        a: "Douglas crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "Rasmus Lurdorf"
      },
      correctanswer: "c",
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      options: {
        a: "Node.js",
        b: "npm",
        c: "typescript",
        d: "js"
      },
      correctanswer: "b",
    },
    {
      question: "Which tool can you use to ensure code quality?",
      options: {
        a: "ESLint",
        b: "Angular",
        c: "jQuery",
        d: "React"
      },
      correctanswer: "a",
    },
    {
      question: "JavaScript is a ______-side programming language?",
      options: {
        a: "client",
        b: "Server",
        c: "both",
        d: "none",
      },
      correctanswer: "a",
    },
    {
      question: "Which built-in method calls a function for each element in the array?",
      options: {
        a: "while()",
        b: "loop()",
        c: "forEach()",
        d: "none",
      },
      correctanswer: "c",
    },
    {
      question: "Which of the following is the correct syntax to print a page using JavaScript?",
      options: {
        a: "window.print()",
        b: "browser.print()",
        c: "navigator.print()",
        d: "none",
      },
      correctanswer: "a",
    },
    {
      question: "What is the HTML tag under which one can write the JavaScript code?",
      options: {
        a: "<javascript>",
        b: "<scripted>",
        c: "<script>",
        d: "<js>",
      },
      correctanswer: "c",
    },
    {
      question: "What is the correct file extension for Javascript files?",
      options: {
        a: ".java",
        b: ".js",
        c: ".javascript",
        d: ".script",
      },
      correctanswer: "b",
    },
    {
      question: "JavaScript language is _____ language.",
      options: {
        a: "Object-Oriented",
        b: "Object-Based",
        c: "Assembly",
        d: "High-level",
      },
      correctanswer: "b",
    },
    {
      question: "Who invented javascript?",
      options: {
        a: "Douglas crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "Guido van Rossum",
      },
      correctanswer: "c",
    },
  ];

  questionIndex: number = 0;
  constructor() { }

  ngOnInit(): void {

    //call TIMER method on page load
    this.timer();


    //code to load first question on page load
    const questionText = document.getElementById("question");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const option4 = document.getElementById("option4");

    questionText.innerText = (this.questionIndex + 1) + ". " + this.questions[0].question;
    option1.innerText = this.questions[0].options.a;
    option2.innerText = this.questions[0].options.b;
    option3.innerText = this.questions[0].options.c;
    option4.innerText = this.questions[0].options.d;

  }


  nextQuestion() {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
      this.loadQuestion(this.questionIndex);
    }

  }

  previousQuestion() {
    if (this.questionIndex > 0) {
      this.questionIndex--;
      this.loadQuestion(this.questionIndex);
    }
  }

  submitTest() {

  }

  loadQuestion(n: number) {
    const questionText = document.getElementById("question");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const option4 = document.getElementById("option4");

    questionText.innerText = (n + 1) + ". " + this.questions[n].question;
    option1.innerText = this.questions[n].options.a;
    option2.innerText = this.questions[n].options.b;
    option3.innerText = this.questions[n].options.c;
    option4.innerText = this.questions[n].options.d;

  }


  //code for timer
  timer() {
    var deadline = new Date().getTime() + 600000;
    var x = setInterval(function () {
      var now = new Date().getTime();
      var t = deadline - now;
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((t % (1000 * 60)) / 1000);
      document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
      if (t < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Time's Up";
      }
    }, 1000);
  }









}
