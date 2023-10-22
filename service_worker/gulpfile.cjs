const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
require('dotenv').config();

gulp.task('manifest', function(){
  return gulp.src('./public/manifest.template.json')
    .pipe(replace('YOUR_CLIENT_ID', process.env.CLIENT_ID))
    .pipe(replace('YOUR_EXTENSION_KEY', process.env.EXTENSION_KEY))
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest('./public'));
});