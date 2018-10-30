const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  csso = require("gulp-csso"),
  del = require("del"),
  htmlmin = require("gulp-htmlmin"),
  runSequence = require("run-sequence"),
  uglify = require("gulp-uglify");

const baseDirVar = "./src/";

// Set the browser that you want to supoprt
const AUTOPREFIXER_BROWSERS = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

// Gulp task to minify CSS files
gulp.task("styles", function() {
  return (
    gulp
      .src("./src/style/**/*.css")
      // Compile SASS files
      .pipe(
        sass({
          outputStyle: "nested",
          precision: 10,
          includePaths: ["."],
          onError: console.error.bind(console, "Sass error:")
        })
      )
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest("./dist/style/"))
  );
});

// Gulp task to minify JavaScript files
gulp.task("scripts", function() {
  return (
    gulp
      .src("./src/scripts/**/*.js")
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest("./dist/js"))
  );
});

// Gulp task to minify HTML files
gulp.task("pages", function() {
  return gulp
    .src(["./src/**/*.html"])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest("./dist"));
});

// Clean output directory
gulp.task("clean", () => del(["dist"]));

// Gulp task to minify all files
gulp.task("miniall", ["clean"], function() {
  runSequence("styles", "scripts", "pages");
});

// Static server
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: baseDirVar
    }
  });
});

// Sass to css
gulp.task("sassit", function() {
  gulp
    .src(baseDirVar + "style/**/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(baseDirVar + "/style/"));
});

//Watch task
gulp.task("watch", ["browserSync", "sassit"], function() {
  gulp.watch(baseDirVar + "style/**/*.sass", ["sassit"]);
  gulp.watch(baseDirVar + "style/**/*.sass", browserSync.reload);
  gulp.watch(baseDirVar + "*.html", browserSync.reload);
  gulp.watch(baseDirVar + "scripts/**/*.js", browserSync.reload);
});

const imagemin = require("gulp-imagemin");

gulp.task("imagemini", () =>
  gulp
    .src("./src/img/**")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"))
);

const concatCss = require("gulp-concat-css");

gulp.task("concatCss", function() {
  return gulp
    .src("./dist/style/**/*.css")
    .pipe(concatCss("./bundle.css"))
    .pipe(gulp.dest("./dist/style/"));
});
