# 路由
## 延遲載入:
  1. 延遲載入不會是強型別。
  2. 當跑延遲載入時，點選連結時，從network會看到載入的檔案(0.chunk.js)
  3. 練習將 ChartsModule 改用延遲載入的方式定義 (包含路由設定)


## 預先載入:
  1. 在forRoot中加上 preloadingStrategy，當第一個module開啟後，會在背景中下載其他的模組
    不會影響當前頁面資料的呈現。

## 路由守門員:
1. 目的: 權限控管
2. 已路由為單位，但是因為是屬於client 端，所以會有風險，  所以權限部分還是要從server端控管。
3. CanActivate: 當有權限時才能進入
4. CanDeactivate: 當頁面要離開時，需做判斷
   (EX:表單輸入至一半時回到上一頁)
### 實作 - CanActivate
#### 題目: 將charts/flot加上權限:  當query params 有apikey=='123'時才能進入，反之則導回登入頁

1. `ng g guard need-login`
2. 加至 `provider`
3. 路由加上`canActivate`
    ```javascript 
        { 
            path: 'charts',
            loadChildren:'./charts/charts.module#ChartsModule',
            canActivate:[NeedLoginGuard]
        }  
   
# 表單 #
* **Template-Driven Form(範本)**:表單欄位固定時使用，  使用ngModel  
    ```javascript 
        import { FormsModule } from '@angular/forms';
    ```
  * ngModel 主要用來建立一個**表單控制項**實體
  * 如果放在`<form>`裡面，則一定要有`name`的屬性
  * #mTitle 主要抓到欄位資訊。EX: value、errors、valid、dirty、touched
  `<input type="text" class="form-control rounded" name="title" [(ngModel)]="data.title" #mTitle="ngModel" required>`   
  * 可以用下列程式碼抓到form
  `<form method="get" action="/" class="form-horizontal" #f="ngForm" (ngSubmit)="doSubmit(f)">`

  * 如果有用disabled，則在form.value裡面會被移除  
      `<input type="text" class="form-control rounded" name="title"                               [(ngModel)]="data.title" #mTitle="ngModel" required [disabled]="mTitle.value==='123'"> ` 
  * 關掉瀏覽器的驗證，在form 中加上屬性`novalidated`
    
  ### 實作 - Template-Driven ###

* Model-Driven Form(模型):表單欄位動態產生時使用,  使用formControlName  
    import { ReactiveFormsModule } from '@angular/forms';
    
* 如果要使用動態驗證的話，要先找到control並replace掉
* FormBuilder.group 

* **FormBuilder.array**:用於動態表單    


# Directive #
* `@HostBinding('style.color')`: 類似input
* `@HostListener('click',['$event']`： component 所有事件使用，參數要丟字串
*  建議不要使用下方寫法，要使用 **Renderer**
```javascript
constructor(private el: ElementRef, private renderer:Renderer) { }

    ngOnInit(){
      this.el.nativeElement.innerHTML="123";
    }
```
# Other #
* `console.dir` : 列出該元件所有屬性
* `console.table`: 將陣列裡面的object已table方式顯示 
* main.ts 動態編譯:
```javascript
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
```
