import { Advcomp1Component } from './../advcomp1/advcomp1.component';
import { Advcomp1PartComponent } from './../advcomp1-part/advcomp1-part.component';
import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-advcomp1-header',
  templateUrl: './advcomp1-header.component.html',
  styleUrls: ['./advcomp1-header.component.css']
})
export class Advcomp1HeaderComponent implements OnInit {

  constructor() { }
  @Input() data:string;
  @ContentChild(Advcomp1PartComponent) part1: Advcomp1Component
  ngOnInit() {
  }

}
