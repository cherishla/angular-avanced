import { IWeekView } from './calendar.utility';
const MILLISECONDS_IN_DAY = 86400000;

export interface IMonthPeriodDate{
  startDate:Date;
  endDate:Date;
}

export interface IMonthViewDay{
   date: Date;
   isToday:boolean;
   isSelect:boolean;
   /**
    * Is within Month
    */
   inMonth: boolean;
   events:IEvent[];
}
export interface IMonthView{
  rowOffsets: number[];
  days: IMonthViewDay[]
}

export interface IWeekView{
  days: IMonthViewDay[]
}
export interface IEvent{
   title: string;
   startTime: Date;
   endTime: Date;
   allDay: boolean;
}
export class CalendarUtility {

    /**
     * 計算該日期的月曆開始時間即結束時間
     * @param transDate 需計算的日期
     */
    static MonthPeriod(transDate: Date): IMonthPeriodDate {
        const YEAR = transDate.getFullYear();
        const MONTH = transDate.getMonth();
        let startDate = new Date(YEAR, MONTH, 1);
        let endDate = new Date(YEAR, MONTH + 1, 0);
        const START_DAY = startDate.getDay();
        const END_DAY = endDate.getDay();
        const END_DATE = endDate.getDate();
        startDate = START_DAY > 0 ? new Date(startDate.setDate(1 - START_DAY)) : startDate;
        endDate = END_DAY < 6 ? new Date(endDate.setDate(END_DATE + (6 - END_DAY))) : endDate;
        return { startDate, endDate };
    }
    /** 取得每週區間 */
    static WeekPeriod(transDate: Date):IMonthPeriodDate{
        let weekStartsOn = 0;
        let day = transDate.getDay();
        let start_diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
        let end_diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
        let start_date = new Date(transDate.getTime());
        let end_date = new Date(transDate.getTime());
        start_date.setDate(start_date.getDate() - start_diff);
        start_date.setHours(0, 0, 0, 0);
        end_date.setDate(end_date.getDate() + end_diff);
        end_date.setHours(0, 0, 0, 0);

        return { startDate:start_date, endDate:end_date };

    }
    /**
     * 取得兩個日期間所有天數
     * @param startDate 開始時間
     * @param endDate 結束時間
     */
    static differenceInDays(startDate: Date, endDate: Date) {
        let startDateMillsecond = startDate.getTime();
        let endDateMillsecond = endDate.getTime();
        if (startDateMillsecond - endDateMillsecond > 0) {
            return Math.abs((startDateMillsecond - endDateMillsecond) / MILLISECONDS_IN_DAY) + 1;
        }
        else {
            return Math.abs((endDateMillsecond - startDateMillsecond) / MILLISECONDS_IN_DAY) + 1;
        }

    }

    /**
     * 依開始結束時間取得月曆
     * @param startDate     開始時間
     * @param endDate       結束時間
     * @param today         今天
     */
    static getMonthView(startDate:Date, endDate:Date): IMonthView {
        let days = CalendarUtility.getDaysDisplay(startDate,endDate);
        //計算月曆行數
        const ROWS: number = Math.floor(days.length / 7);
        let rowOffsets: number[] = [];
        for (let i = 0; i < ROWS; i++) {
            rowOffsets.push(i * 7);
        }
        return {
            rowOffsets: rowOffsets,
            days: days
        };
    }

    /**
     * 依開始結束時間取得月曆
     * @param startDate     開始時間
     * @param endDate       結束時間
     * @param today         今天
     */
    static getWeekView(startDate:Date, endDate:Date): IWeekView {
        let days = CalendarUtility.getDaysDisplay(startDate,endDate);
        return { days };
    }
    static initViewDay(date:Date){
      return {
         date:date,
         isToday:false,
         isSelect:false,
         inMonth: false,
         events:[]
      }
    }

    /**
     * 判斷是否為同一天
     * @param dirtyDateLeft  日期1
     * @param dirtyDateRight 日期2
     */
    static isSameDay(dirtyDateLeft: Date, dirtyDateRight:Date) {
        dirtyDateLeft.setHours(0, 0, 0, 0);
        dirtyDateRight.setHours(0, 0, 0, 0);

        return dirtyDateLeft.getTime() === dirtyDateRight.getTime();
    }

    /**
     * 判斷是否為同一個月
     * @param dirtyDateLeft  日期1
     * @param dirtyDateRight 日期2
     */
    static isSameMonth(dirtyDateLeft: Date, dirtyDateRight: Date) {
        return dirtyDateLeft.getFullYear() === dirtyDateRight.getFullYear() && dirtyDateLeft.getMonth() === dirtyDateRight.getMonth();
    }

    /**
     * 建立事件
     */
    static createRandomEvents():IEvent[] {
        var events = [];
        for (var i = 0; i < 15; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }

    static getDaysDisplay(startDate, endDate){
       let days: IMonthViewDay[] = [],
             today: Date = new Date(),
             monthInDays: number = CalendarUtility.differenceInDays(startDate, endDate),//計算該月有多少天
             startYear: number = startDate.getFullYear(),//月曆開始年
             startMonth: number = startDate.getMonth(),  //月曆開始月
             startDateNumber: number = startDate.getDate(), //月曆開始日
             //showToday: boolean = true,         //如果是當月，就要判斷是否為今天
             hasToday: boolean = false;         //如果是當月，且已經有今天，就不用再判斷
        //     isToday: boolean = false;          //判斷選擇日期是否為今天


        //組資料
        for (let i = 0; i < monthInDays; i++) {
            let date: Date = new Date(startYear, startMonth, startDateNumber + i, 0, 0, 0),
        //         lunarData: any,
                viewDay: IMonthViewDay = CalendarUtility.initViewDay(date);

            //判斷是否為當月
            viewDay.inMonth = CalendarUtility.isSameMonth(today, date);
            //判斷是否為今天
            if (!hasToday) {
                viewDay.isToday = CalendarUtility.isSameDay(date, today);
                viewDay.isSelect =  viewDay.isToday;
             }
             else{
                viewDay.isToday = false;
                viewDay.isSelect =  false
             }

            days.push(viewDay);
        }

        return days;
    }

    static EventLoaded(startDate, endDate, eventSource,view){
      let monthStartTime = startDate,
          monthEndTime = endDate;
    for (let i = 0; i < eventSource.length; i++) {
      let dayEvent = eventSource[i],
        st = dayEvent.startTime,
        et = dayEvent.endTime,
        startIndex = Math.floor(CalendarUtility.differenceInDays(monthStartTime, st)) - 1,
        diff: number,
        index: number;

      if (!CalendarUtility.isSameDay(st, et)) {
        diff = Math.floor(CalendarUtility.differenceInDays(st, et));
      }

      if (diff > 0) {
        for (let j = 0; j < diff; j++) {
          index = startIndex + j;
          view.days[index].events.push(dayEvent);
        }
      }
      else {
        index = startIndex;
        view.days[index].events.push(dayEvent);

      }


    }

    }
}
