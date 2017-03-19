import { WeekComponent } from './week/week.component';
import { ValidatorFn } from '@angular/forms';
import { MonthComponent } from './month/month.component';
import { IEvent, CalendarUtility, IMonthViewDay } from './calendar.utility';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild(MonthComponent) Month: MonthComponent;
  @ViewChild(WeekComponent) Week: WeekComponent;
  constructor() { }
  events: IEvent[];
  dayView: IMonthViewDay;
  title: string;
  type: string="month";
  ngOnInit() {
    this.events = CalendarUtility.createRandomEvents();
    this.getTitle();
  }

  monthClick() {
    this.dayView = this.Month.selectItem;
  }
  weekClick() {
    this.dayView = this.Week.selectItem;
  }

  typeChange(type) {
    this.type = type;
    this.getTitle();
  }
  getTitle() {
    if (this.type ==="month") {
      this.title = new Date().getMonth() + 1 + "月";
    } else {
      this.title = this.Week.IMonthPeriodDate.startDate.toLocaleDateString() + "~" + this.Week.IMonthPeriodDate.endDate.toLocaleDateString()
    }
  }
}
