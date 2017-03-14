# angular-avanced
## 延遲載入:
  1. 延遲載入不會是強型別。
  2. 當跑延遲載入時，點選連結時，從network會看到載入的檔案(0.chunk.js)
  3. 練習將 ChartsModule 改用延遲載入的方式定義 (包含路由設定)


## 預先載入:
  1. 在forRoot中加上 preloadingStrategy，當第一個module開啟後，會在背景中下載其他的模組
    不會影響當前頁面資料的呈現。

##路由守門員:
1. 目的: 權限控管
2. 已路由為單位，但是因為是屬於client 端，所以會有風險，  所以權限部分還是要從server端控管。
###實作
####題目: 將charts/flot加上權限:  當query params 有apikey=='123'時才能進入，反之則導回登入頁

######1. `ng g guard need-login`
######2. 加至provider
######3. 路由加上canActivate
            { path: 'charts',
        loadChildren:'./charts/charts.module#ChartsModule',
        canActivate:[NeedLoginGuard]
      }     
