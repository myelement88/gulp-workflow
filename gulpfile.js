var gulp = require("gulp"),
  watch = require("gulp-watch"),
  rename = require("gulp-rename"),
  nunjucksRender = require("gulp-nunjucks-render"),
  markdown = require("gulp-markdown"),
  sass = require("gulp-sass");

gulp.task("styles", function() {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(rename("css/main_bundle.css"))
    .pipe(gulp.dest("./docs"));
});

gulp.task("markdown", function() {
  gulp
    .src("./src/pages/content/*.md")
    .pipe(markdown())
    .pipe(
      rename(function(path) {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest("./src/pages/content"));
});

gulp.task("nunjuck", function() {
  return gulp
    .src("./src/pages/*.+(html|njk)")
    .pipe(nunjucksRender({ path: ["src/pages"] }))
    .pipe(gulp.dest("./docs"));
});

gulp.task("watch", function() {
  watch("./src/pages/**/*.(njk|html)", function() {
    gulp.start("nunjuck");
  });

  watch("./src/scss/**/*.scss", function() {
    gulp.start("styles");
  });

  watch("./src/pages/content/**/*.md", function() {
    gulp.start("markdown");
  });
});
