import { CalendarUtility, IMonthPeriodDate, IMonthView, IEvent, IMonthViewDay } from './../calendar.utility';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  IMonthPeriodDate: IMonthPeriodDate;
  IMonthView: IMonthView;
  type: string = "month";
  selectItem:IMonthViewDay;
  @Input() eventSource: IEvent[];
    constructor() { }

  ngOnInit() {
    this.IMonthPeriodDate = CalendarUtility.MonthPeriod(new Date());
    this.IMonthView = CalendarUtility.getMonthView(this.IMonthPeriodDate.startDate, this.IMonthPeriodDate.endDate);
    let eventSource = this.eventSource.filter((x: IEvent) => {
      let endDate = new Date(this.IMonthPeriodDate.endDate.setHours(23, 59, 59, 999));
      return x.startTime >= this.IMonthPeriodDate.startDate && x.endTime <= endDate;
    }),
    todayIndex = Math.floor(CalendarUtility.differenceInDays(this.IMonthPeriodDate.startDate, new Date())) - 1;
    this.selectItem = this.IMonthView.days[todayIndex];

    CalendarUtility.EventLoaded(this.IMonthPeriodDate.startDate, this.IMonthPeriodDate.endDate, eventSource, this.IMonthView);
  }

  selectDate(item: IMonthViewDay) {
    this.selectItem.isSelect = false;
    this.selectItem = item;
    this.selectItem.isSelect = true;

  }

}

