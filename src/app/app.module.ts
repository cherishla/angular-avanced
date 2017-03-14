import { NeedLoginGuard } from './need-login.guard';
import { LoginModule } from './login/login.module';
import { ChartsModule } from './charts/charts.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { LayoutComponent } from './layout/layout.component';
import { FormComponent } from './form/form.component';
import { Form2Component } from './form2/form2.component';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    DashboardComponent,
    CardsComponent,
    LayoutComponent,
    FormComponent,
    Form2Component

  ],
  imports: [
    BrowserModule,
    //只支援template form
    FormsModule,
    //動態表單
    ReactiveFormsModule,
    HttpModule,
    //有順序問題，所以chartsModule要先放在上面
    //ChartsModule,
    LoginModule,
    AppRoutingModule,

  ],
  providers: [NeedLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
