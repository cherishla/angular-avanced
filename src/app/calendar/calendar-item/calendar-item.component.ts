import { IEvent } from './../calendar.utility';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {

  @Input() data:IEvent;
  @Input() showTime:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
