import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  form: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        'title': ['p1',[Validators.required, Validators.maxLength(10)]],
        'subtitle': ['p2', Validators.required]
      }
    );
  }
  doSubmit(f) {

  }
}
