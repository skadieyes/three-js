import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import { ResumeService } from './resume.service';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss'],
    providers: [ResumeService]
})
export class ResumeComponent implements OnInit, AfterViewInit {
    @ViewChild('techChart') techChart: any;
    constructor(private _el: ElementRef, private _render: Renderer2, public _resume: ResumeService) { }

    ngOnInit() {
        const chart = echarts.init(this.techChart.nativeElement, 'dark');
        const techData = this._resume.techTree;
        chart.setOption(techData);
    }
    ngAfterViewInit() {

    }


    bodyInit() {
        const el = document.getElementsByClassName('resume-body');
        if (el.length > 0) {
            for (let i = 0; i < el.length; i++) {
                this._render.setStyle(el[i], 'height', window.innerHeight + 'px');
            }
        }
    }

}
