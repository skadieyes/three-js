import { Injectable } from '@angular/core';


@Injectable()
export class ResumeService {
     techTreeJs = {
        series: [{
            type: 'treemap',
            name: 'JavaScript',
            data: [{
                name: 'typescript',
                value: 10,
            },
            {
                name: 'Node.js',
                value: 10,
            },
            {
                name: 'React',
                value: 10,
            },
            {
                name: 'three.js',
                value: 10,
            },
            {
                name: 'WebGL',
                value: 10,
            },
            {
                name: 'Angular',
                value: 20,
            }]
        }]
    };
     techTreeCss = {
        series: [{
            type: 'treemap',
            name: 'CSS',
            data: [{
                name: 'typescript',
                value: 10,
            },
            {
                name: 'Node.js',
                value: 10,
            },
            {
                name: 'React',
                value: 10,
            },
            {
                name: 'three.js',
                value: 10,
            },
            {
                name: 'WebGL',
                value: 10,
            },
            {
                name: 'Angular',
                value: 20,
            }]
        }]
    };

}
