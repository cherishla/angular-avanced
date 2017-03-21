import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTest1]'
})
export class Test1Directive {

  @HostBinding('style.color')
  textColor:string='red';

  @HostListener('click',['$event'])
  changeColor($event){
    this.textColor='darkgreen';
    console.log($event);
  }
  constructor() { }

}
