import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NeedLoginGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    /**目前啟用路由 */
    next: ActivatedRouteSnapshot,
    /**狀態
     * 非同步的話要回傳Observable
    */
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(next.queryParams["apikey"]==='123'){
          return true;
      }else{
          this.router.navigateByUrl('login');
          return false;
      }
  }
}
