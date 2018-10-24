const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  minify = require("gulp-minifier");

const baseDirVar = "./src/";

// Static server
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: baseDirVar
    }
  });
});

gulp.task("styles", function() {
  gulp
    .src(baseDirVar + "style/**/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(baseDirVar + "/style/"));
});

// run separately #1
gulp.task("prefix", function() {
  gulp
    .src("style/**/*.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("dist"));
});

// run separately #2
gulp.task("mini", function() {
  return gulp
    .src("**/*")
    .pipe(
      minify({
        minify: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true,
        getKeptComment: function(content, filePath) {
          var m = content.match(/\/\*![\s\S]*?\*\//gim);
          return (m && m.join("\n") + "\n") || "";
        }
      })
    )
    .pipe(gulp.dest("example/dest"));
});

//Watch task
gulp.task("watch", ["browserSync", "styles"], function() {
  gulp.watch(baseDirVar + "style/**/*.sass", ["styles"]);
  gulp.watch(baseDirVar + "style/**/*.sass", browserSync.reload);
  gulp.watch(baseDirVar + "*.html", browserSync.reload);
  gulp.watch(baseDirVar + "scripts/**/*.js", browserSync.reload);
});
