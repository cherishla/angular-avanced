import { Component, OnInit, Input } from '@angular/core';
import { CalendarUtility, IMonthPeriodDate, IWeekView, IEvent, IMonthViewDay } from './../calendar.utility';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  IMonthPeriodDate: IMonthPeriodDate;
  IWeekView: IWeekView;
  selectItem:IMonthViewDay;
  @Input() eventSource: IEvent[];

  constructor() { }

  ngOnInit() {
    this.IMonthPeriodDate = CalendarUtility.WeekPeriod(new Date());
    this.IWeekView = CalendarUtility.getWeekView(this.IMonthPeriodDate.startDate, this.IMonthPeriodDate.endDate);
    let eventSource =this.eventSource.filter((x: IEvent) => {
      let endDate = new Date(this.IMonthPeriodDate.endDate.setHours(23, 59, 59, 999));
      return x.startTime >= this.IMonthPeriodDate.startDate && x.endTime <= endDate;
    }),
    todayIndex = Math.floor(CalendarUtility.differenceInDays(this.IMonthPeriodDate.startDate, new Date())) - 1;
    this.selectItem = this.IWeekView.days[todayIndex];

    CalendarUtility.EventLoaded(this.IMonthPeriodDate.startDate, this.IMonthPeriodDate.endDate, eventSource, this.IWeekView);

    }


selectDate(item: IMonthViewDay) {
    this.selectItem.isSelect = false;
    this.selectItem = item;
    this.selectItem.isSelect = true;

  }
}
