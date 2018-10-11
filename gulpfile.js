var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssvars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var rename = require("gulp-rename");
var nunjucksRender = require("gulp-nunjucks-render");

gulp.task("default", () =>
  gulp
    .src("./src/views/greetings.html")
    .pipe(nunjucks.compile({ name: "myElement" }))
    .pipe(gulp.dest("dist"))
);

gulp.task("html", function() {
  console.log("Imagine something useful done here.");
});

gulp.task("njk", function() {
  return gulp
    .src("./src/templates/**/*.+(html|njk)")
    .pipe(nunjucksRender({ path: ["src/templates"] }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("css", function() {
  return gulp
    .src("./src/css/main.css")
    .pipe(postcss([cssvars, nested, autoprefixer]))
    .pipe(rename("css/main_bundle.css"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("watch", function() {
  watch("./src/index.html", function() {
    gulp.start("html");
  });

  watch("./src/css/**/*.css", function() {
    gulp.start("css");
  });
});
