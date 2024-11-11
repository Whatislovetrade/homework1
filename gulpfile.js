'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const clean = require('gulp-clean');
const path = require('path');

const dist = './dist';

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 4500
    });
});

gulp.task('copy-html', () => {
    return gulp.src('./src/*.html')
           .pipe(gulp.dest(dist))
           .pipe(browserSync.stream());
});

gulp.task('copy-assets', () => {
    return gulp.src('./src/assets/**/*.*')
           .pipe(gulp.dest(dist + '/assets'))
           .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    return gulp.src('./src/assets/fonts/**/*.*')
           .pipe(gulp.dest(dist + '/fonts'))
           .pipe(browserSync.stream());
});

gulp.task('clean', function () {
    return gulp.src(dist, {read: false, allowEmpty: true})
           .pipe(clean({force: true}));
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpackStream({
                    mode: 'development',
                    output: {
                        filename: 'build.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                            {
                                test: /\.m?js$/,
                                exclude: /(node_modules|bower_components)/,
                                use: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [['@babel/preset-env', {
                                            debug: true,
                                            corejs: 3,
                                            useBuiltIns: "usage"
                                        }]]
                                    }
                                }
                            }
                        ]
                    }
                }, webpack))
                .pipe(gulp.dest(dist + '/js'))
                .pipe(browserSync.stream());
});

// Задача для продакшн-сборки JavaScript
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpackStream({
                    mode: 'production',
                    output: {
                        filename: 'build.js'
                    },
                    module: {
                        rules: [
                            {
                                test: /\.m?js$/,
                                exclude: /(node_modules|bower_components)/,
                                use: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [['@babel/preset-env', {
                                            corejs: 3,
                                            useBuiltIns: "usage"
                                        }]]
                                    }
                                }
                            }
                        ]
                    }
                }, webpack))
                .pipe(gulp.dest(dist + '/js'));
});

// Копирование дополнительных JS-файлов, которые не собираются через Webpack
gulp.task('copy-js', () => {
    return gulp.src('./src/js/slider.js')
           .pipe(gulp.dest(dist + '/js'))
           .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy-html', 'copy-assets', 'fonts', 'build-js', 'copy-js')));
gulp.task('build-prod', gulp.series('clean', gulp.parallel('copy-html', 'copy-assets', 'fonts', 'build-prod-js', 'copy-js')));

// Задача для отслеживания изменений
gulp.task('watch', () => {
    gulp.watch('./src/*.html', gulp.series('copy-html'));
    gulp.watch('./src/assets/**/*.*', gulp.series('copy-assets'));
    gulp.watch('./src/assets/fonts/**/*.*', gulp.series('fonts'));
    gulp.watch('./src/js/**/*.js', gulp.series('build-js', 'copy-js'));
});

gulp.task('default', gulp.series('build', gulp.parallel('browser-sync', 'watch')));
