import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FoodModule } from './food/food.module';
import { FlyGameModule } from './fly-game/fly-game.module';
import { ResumeModule } from './resume/resume.module';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        FoodModule,
        FlyGameModule,
        ResumeModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
