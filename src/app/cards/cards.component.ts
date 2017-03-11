import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  //router: 全部的路由 | route: 目前的路由
  constructor(private router: Router, private route: ActivatedRoute) {
    //第一次進入=false, 如果已經導覽過，就會是true
    //this.router.navigated
  }
  num = 0;
  p1;
  p2;
  ngOnInit() {
    this.p1 = this.route.snapshot.params['p1'];
    this.p2 = this.route.snapshot.params['p2'];
    //當參數改變的時候，就會跟著改變
    this.route.params.subscribe((params)=>{
      if(!isNaN(parseInt(params['num'])))
          this.num = parseInt(params['num']);
    });
    //只會讀一次，所以如果資料有更新，就不會再變動
    //this.num = this.route.snapshot.params['num'];
  }

  GoHome(){
    //固定的
    this.router.navigateByUrl('/');
  }

  GoChartFlot(){
    //動態的
    this.router.navigate(['/charts','flot']);
  }
  IncrementNum(){
    //this.router.navigate(['/cards', this.num+1]);
    //..為相對路徑
    //{p1:this.p1, p2:this.p2}可選參數，不會因為網址變動而跟著帶入，所以要自己帶進去
    this.router.navigate(["..",this.num+1, {p1:this.p1, p2:this.p2}],
    {relativeTo:this.route, queryParams:{Name:'lala'}},
    );
  }
}
