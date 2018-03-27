import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { NzTimelineModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    CommonModule,
    NzTimelineModule
  ],
  declarations: [ResumeComponent]
})
export class ResumeModule { }
