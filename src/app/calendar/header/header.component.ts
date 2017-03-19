import { IMonthViewDay } from './../calendar.utility';
import { WeekComponent } from './../week/week.component';
import { MonthComponent } from './../month/month.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  calendarType: string = "month";
  @Input() selectItem:IMonthViewDay[];
  @Input() title:string;
  @Output() typeChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {


  }

    changeType(type) {
   this.calendarType = type;
   this.typeChange.emit(type);
  }


}
