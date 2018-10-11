var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssvars = require("postcss-simple-vars");

gulp.task("default", function() {
  console.log("Hooray, a new Gulp task.");
});

gulp.task("html", function() {
  console.log("Imagine something useful done here.");
});

gulp.task("css", function() {
  return gulp
    .src("./src/css/main.css")
    .pipe(postcss([cssvars, autoprefixer]))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("watch", function() {
  watch("./src/index.html", function() {
    gulp.start("html");
  });

  watch("./src/css/**/*.css", function() {
    gulp.start("css");
  });
});
