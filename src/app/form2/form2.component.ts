import { forbiddenNameValidator, myNameValidator } from './validators/myname.validator';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  form: any;
  types=[1,2,3,4,5];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        'title': ['p1',[Validators.required, Validators.maxLength(10), myNameValidator]],
        'subtitle': ['p2', [Validators.required, forbiddenNameValidator(/lala/i)]],
        'types':this.fb.array(
          this.types.map(item=>{
            return this.fb.control(item , Validators.required)
          })
        )
      }
    );
  }
  doSubmit(f) {

  }
}
