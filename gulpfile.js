//Plugins
const { dest, parallel, series, src, watch } = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const injectPartials = require('gulp-inject-partials');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const template = require('gulp-template-html');
const uglify = require('gulp-uglify');

// Directories
const rootDir = 'styleguide/';
const buildDir = `${rootDir}builds/`;
const distDir = `dist/public/`;
const srcDir = `${rootDir}src/`;

// Files
const htmlFiles = [`${srcDir}**/*.html`];
const scriptFiles = [`${srcDir}**/*.js`];
const stylesFiles = [`${srcDir}**/*.scss`];

// Settings
const env = {
  DEV: 'dev',
  PROD: 'prod',
};
const envVar = env.PROD; //process.env.NODE_ENV || "dev"
const outputDir = envVar === env.PROD ? distDir : `${buildDir}development/`;
const sassOutput = envVar === env.PROD ? 'compressed' : 'expanded';
sass.compiler = require('node-sass');

const htmlBuild = (callback) => {
  // Build Components
  src(`${srcDir}components/*/index.html`)
    .pipe(injectPartials({ removeTags: true }))
    .pipe(template(`${srcDir}templates/component/index.html`))
    .pipe(dest(`${buildDir}development/components/`));

  // Build Templates
  src(`${srcDir}templates/*/*.html`)
    .pipe(injectPartials({ removeTags: true }))
    .pipe(dest(`${buildDir}development/templates/`));

  callback();
};

/*
 * Images are hosted through prismic. This is just for local development to help with styling
 */
const images = (callback) => {
  src(`${rootDir}assets/images/*.*`).pipe(dest(`${buildDir}assets/images/`));
  callback();
};

const localServe = (callback) => {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: buildDir,
    },
  });
  callback();
};

const scriptsCompile = (callback) => {
  browserify({
    entries: [`${srcDir}base/scripts/global.js`],
  })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('global.js'))
    .pipe(buffer())
    .pipe(gulpif(env === env.PROD, uglify()))
    .pipe(dest(`${outputDir}scripts/`));
  callback();
};

const stylesCompile = (callback) => {
  src(`${srcDir}base/sass/global.scss`)
    .pipe(sass({ outputStyle: sassOutput }).on('error', sass.logError))
    .pipe(dest(`${outputDir}styles/`));
  callback();
};

const watchFiles = (callback) => {
  watch(scriptFiles).on('change', series(scriptsCompile, browserSync.reload));
  watch(stylesFiles).on('change', series(stylesCompile, browserSync.reload));
  watch(htmlFiles).on('change', series(htmlBuild, browserSync.reload));
  callback();
};

exports.default = series(
  parallel(htmlBuild, stylesCompile, scriptsCompile, images),
  localServe,
  watchFiles
);
