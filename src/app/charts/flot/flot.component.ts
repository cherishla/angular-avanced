import { Observable } from 'rxjs/Observable';
import { ExpressionChangedAfterItHasBeenCheckedError } from '@angular/core/src/linker/errors';
import { FlotCharts } from '../../dashboard/init';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import 'rxjs';
@Component({
  selector: 'app-flot',
  templateUrl: './flot.component.html',
  styleUrls: ['./flot.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FlotComponent implements OnInit {

  constructor(private _ngZone:NgZone, private cd:ChangeDetectorRef) { }
  temp=1;
  ngOnInit() {
    // this._ngZone.runOutsideAngular(()=>{
      $(FlotCharts);
    // });
    Observable.interval(1000).subscribe((id)=>{
      this.temp++;
      this.cd.markForCheck();

    });
  }
  setDay(){
    console.log(new Date());
    return 1;
  }
}
