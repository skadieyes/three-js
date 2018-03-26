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
    @ViewChild('techChartJs') techChartJs: any;
    @ViewChild('techChartCss') techChartCss: any;
    constructor(private _el: ElementRef, private _render: Renderer2, public _resume: ResumeService) { }

    ngOnInit() {
        const chartJs = echarts.init(this.techChartJs.nativeElement, 'dark');
        const techData = this._resume.techTreeJs;
        chartJs.setOption(techData);

        const chartCss = echarts.init(this.techChartCss.nativeElement, 'dark');
        const techCssData = this._resume.techTreeCss;
        chartCss.setOption(techCssData);
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
