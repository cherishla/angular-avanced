import { Directive, ElementRef, HostBinding, HostListener, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appTest1]'
})
export class Test1Directive implements OnInit {

  @HostBinding('style.color')
  textColor:string='red';

  @HostListener('click',['$event'])
  changeColor($event){
    this.textColor='darkgreen';
    console.log($event);
  }
  constructor(private el: ElementRef, private renderer:Renderer) { }

    ngOnInit(){
      //取代element 的內容，但不建議使用，需透過Renderer來實作
      //this.el.nativeElement.innerHTML="123";

    }

}
