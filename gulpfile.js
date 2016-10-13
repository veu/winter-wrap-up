const babel = require("gulp-babel");
const gulp = require("gulp");
const manglePlugin = require("./babel/mangle-plugin");
const rename = require("gulp-rename");
const replace = require('gulp-replace');

gulp.task("default", function () {
  return gulp.src("full.js")
    .pipe(babel({
        plugins: [manglePlugin],
        compact: true,
        comments: false
    }))
    // Replace the last semicolon in both functions and the program.
    // We can’t use the babel minified option here because it does
    // random other changes that increase size (eg. 1e3 => 1000).
    .pipe(replace(/;(?=}|$)/g, ''))
    .pipe(rename('min.js'))
    .pipe(gulp.dest("."));
});