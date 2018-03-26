'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    scss = require("gulp-scss"),
    less = require('gulp-less'),
    sass = require("gulp-sass");



gulp.task('lessTask', function() {
    return gulp.src('src/app/components/grid/style/index.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

gulp.task('markDownTask', function() {
    return gulp.src('src/example/resource/markdown.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

gulp.task('themes', function() {
    return gulp.src(['src/assets/sass/theme/**/*.scss'])
        .pipe(gulp.dest('resources/themes'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function() {
    del(['resources']);
});

gulp.task('compile-sass', function() {
    gulp.src(['src/app/sass/theme/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/assets/sass/theme'));
});
//Building project with run sequence
gulp.task('build-assets', ['clean', 'build-css-prod', 'images', 'themes']);