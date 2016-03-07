  var gulp = require('gulp'),
      sass = require('gulp-ruby-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      browserSync = require('browser-sync').create();


  gulp.task('watch', function() {

    browserSync.init({
         server: ""
     });

    gulp.watch("*.html").on('change', browserSync.reload);
     // Watch .scss files
    gulp.watch('./assets/sass/**/*.scss', ['styles']);

    // Watch image files
    gulp.watch('./assets/images/**/*', ['images']);

  });


  gulp.task('styles', function() {
    return sass('./assets/sass/styles.scss', { style: 'expanded' })
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('css/'))
      .pipe(browserSync.stream());
  });


  gulp.task('images', function() {
    return gulp.src('./assets/images/**/*')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('img/'));
  });


  gulp.task('default', ['watch', 'images']);
