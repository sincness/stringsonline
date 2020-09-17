import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
    @Input('score') score;
    @Input() maxScore = 5;
    @Input('forDisplay') forDisplay = false;
    @Output() rateChanged = new EventEmitter();
    
    range = [];
    marked = -1;
    current = this.aof(5)
  
    constructor() { }
  
    ngOnInit() {
      this.score = this.floatFixed(this.score);
      
      for (var i = 0; i < this.maxScore; i++) {
        this.range.push(i);
      }
    }

    public mark(index) {   
      this.range = [];
      this.marked = this.marked == index ? index - 1 : index;
      this.score = this.marked + 1;
      console.log(this.score);
      for (var i = 0; i < this.maxScore; i++) {
        this.range.push(i);
      }
      // Delta repræsenterer det maksimale antal af stjerner, mens score repræsenterer current selected value af star rating'en
      // const delta = this.current.length % this.score;
      // console.log(delta);
      


      this.rateChanged.next(this.score);
      // console.log(this.score);
      
    }

    floatFixed(x) {
      x = Number.parseFloat(x).toFixed(1);      
      return Math.floor(x);
    }
  
    public isMarked(index) {
      // switch (this.score) {
      //   default:
      //     if (index <= this.marked) {
      //       return 'fa-star';
      //     }
      //     else {
      //       return 'fa-star-o';
      //     }
      //     break;
      // }


      // if (!this.forDisplay) {
      //   if (index <= this.marked) {
      //     return 'fa-star';
      //   }
      //   else {
      //     return 'fa-star-o';
      //   }
      // }
      // else {
      //   if (this.score >= index + 1) {
      //     return 'fa-star';
      //   }
      //   else if (this.score > index && this.score < index + 1) {
      //     return 'fa-star-half-o';
      //   }
      //   else {
      //     return 'fa-star-o';
      //   }
      // }
    }

    // Array of Certain Number Function
    aof(n) {
      return Array(n)
    }
  
  // }


}
