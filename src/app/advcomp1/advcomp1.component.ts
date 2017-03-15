import { Advcomp1HeaderComponent } from './../advcomp1-header/advcomp1-header.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-advcomp1',
  templateUrl: './advcomp1.component.html',
  styleUrls: ['./advcomp1.component.css']
})
export class Advcomp1Component implements OnInit {

  @ViewChild('p') p: ElementRef;
  @ViewChild('myHeader') myHeader1: Advcomp1HeaderComponent;
  @ViewChild(Advcomp1HeaderComponent) myHeader2: Advcomp1HeaderComponent;
  constructor() { }

  ngOnInit() {

  }
  debug() {
      console.log(this.p);
      console.log(this.myHeader1);
      console.log(this.myHeader2);
  }
}
