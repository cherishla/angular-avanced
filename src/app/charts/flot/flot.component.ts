import { FlotCharts } from '../../dashboard/init';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flot',
  templateUrl: './flot.component.html',
  styleUrls: ['./flot.component.css']
})
export class FlotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(FlotCharts);
  }

}
