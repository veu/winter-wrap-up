const babel = require('gulp-babel');
const fs = require('fs');
const gulp = require('gulp');
const manglePlugin = require('./babel/mangle-plugin');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const size = require('gulp-size');
const zip = require('gulp-zip');

gulp.task('default', ['zip'], function () {
});

gulp.task('zip', ['join_assets'], function () {
  return gulp.src('dist/index.html')
    .pipe(zip('dist.zip'))
    .pipe(size({pretty: false, showFiles: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('join_assets', ['minify'], function () {
  const js = fs.readFileSync('dist/min.js', 'utf8');
  return gulp.src('src/index.html')
    .pipe(replace(/<demo>/g, js))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
  return gulp.src('src/full.js')
    .pipe(babel({
      compact: true,
      comments: false
    }))
    .pipe(babel({
      plugins: [
        [
          manglePlugin,
          {
            excludedCharacters: [
              'E' // because of Math.E
            ],
            namesToReplace: [
              'drawArc',
              'board',
              'pinkieX',
              'pinkieY',
              'dx',
              'dy',
              'moved',
              'track',
              'drawP',
              'active',
              'movedSnow',
              'sSource',
              'animStep',
              'sDest'
            ]
          }
        ] 
      ],
      compact: true,
      comments: false
    }))
    // Replace the last semicolon in both functions and the program.
    // We can’t use the babel minified option here because it does
    // random other changes that increase size (eg. 1e3 => 1000).
    .pipe(replace(/;(?=}|$)/g, ''))
    .pipe(rename('min.js'))
    .pipe(gulp.dest('dist'));
});