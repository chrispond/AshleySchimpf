//GULP PLUGINS
const gulp = require("gulp");
const gutil = require("gulp-util");
const browserify = require("browserify");
const babelify = require("babelify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const compass = require("gulp-compass");
const connect = require("gulp-connect");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");
const template = require("gulp-template-html");
const injectPartials = require("gulp-inject-partials");

//PROJECT VARIABLES
const rootFolder = "styleguide/";
const prodFolder = "dist/public/";
const srcFolder = `${rootFolder}src/`;
const buildsFolder = `${rootFolder}builds/`;
// const env = process.env.NODE_ENV || "dev";
const env = "prod";
const outputDir = env === "prod" ? prodFolder : `${buildsFolder}development/`;
const sassStyle = env != "dev" ? "expanded" : "compressed";

const jsFiles = [`${srcFolder}base/scripts/*.js`, `${srcFolder}**/scripts.js`];
const sassFiles = [`${srcFolder}base/sass/*.scss`];

//JS
gulp.task("jsCompile", () => {
  browserify({ debug: false })
    .transform(babelify, { presets: ["@babel/preset-env"] })
    .add(`${srcFolder}base/scripts/global.js`)
    .bundle()
    // .on('error', logError)
    .pipe(source("global.js"))
    // Prod only steps
    .pipe(buffer()) // Need to buffer in order to uglify
    .pipe(gulpif(env === "prod", uglify()))
    // end prod only steps
    .pipe(gulp.dest(outputDir + "scripts"))
    .pipe(connect.reload());
});

//CSS
gulp.task("cssCompile", () =>
  gulp
    .src(sassFiles)
    .pipe(
      compass({
        sass: `${srcFolder}base/sass`,
        style: sassStyle,
      })
    )
    .on("error", gutil.log)
    .pipe(gulp.dest(outputDir + "styles"))
    .pipe(connect.reload())
);

gulp.task("connect", () =>
  connect.server({
    root: outputDir,
    livereload: true,
    host: "0.0.0.0",
  })
);

//Grab all component and put them into a template
gulp.task("components", function () {
  gulp
    .src(`${srcFolder}components/*/index.html`)
    .pipe(
      injectPartials({
        removeTags: true,
      })
    )
    .pipe(template(`${srcFolder}templates/component/index.html`))
    .pipe(gulp.dest(`${buildsFolder}development/components/`))
    .pipe(connect.reload());
});

//Build Templates
gulp.task("templates", () => {
  gulp
    .src(`${srcFolder}templates/*/*.html`)
    .pipe(
      injectPartials({
        removeTags: true,
      })
    )
    .pipe(gulp.dest(`${buildsFolder}development/templates/`));
});

//Copy Images
gulp.task("copyImages", () => {
  gulp
    .src(`${rootFolder}assets/images/*.*`)
    .pipe(gulp.dest(outputDir + "assets/images/"));
});

//Watches changes in files
gulp.task("watch", () => {
  gulp.watch(jsFiles, gulp.series(["jsCompile"]));
  gulp.watch(
    [`${srcFolder}*/*/*.scss`, `${srcFolder}*/*/*/*.scss`],
    gulp.series(["cssCompile"])
  );
  gulp.watch(`${srcFolder}**/*.html`, gulp.series(["templates", "components"]));
});

gulp.task(
  "serve",
  gulp.parallel(
    "jsCompile",
    "cssCompile",
    "components",
    "templates",
    "copyImages",
    "connect",
    "watch"
  )
);
gulp.task("build", gulp.parallel("jsCompile", "cssCompile"));
