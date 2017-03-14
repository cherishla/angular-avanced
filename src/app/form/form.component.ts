import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }
  data: any = {};
  ngOnInit() {
  }

  doSubmit(f: NgForm) {
    console.log(f.value);
  }
}
