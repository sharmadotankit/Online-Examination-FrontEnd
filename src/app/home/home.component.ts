import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideIndex: number = 0;
  constructor() { }

  ngOnInit() {

    var slideIndex = this.slideIndex;
    showSlides();

    function showSlides() {
      var i;
      var slides
      slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1 }
      try {
        slides[slideIndex - 1].style.display = "block";
      }
      catch {

      }
      finally {
        setTimeout(showSlides, 3500); // Change image every 2 seconds
      }
    }

  }

}
