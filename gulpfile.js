// Dependencies
var gulp = require('gulp'),
    browserify = require('browserify'), // Bundles js files and required modules for the frontend.
    babelify = require('babelify'), // Transpiles various different code formats (in this case ES6 and react jsx).
    source = require('vinyl-source-stream'), // Allows the use of conventional npm packages instead of Gulp-specific plugins.
    gutil = require('gulp-util'), // Logging and error throwing.
    less = require('gulp-less'), // LESS compiler.
    sourcemaps = require('gulp-sourcemaps'), // Tool to create inline sourcemaps for compiled css.
    postcss = require('gulp-postcss'), // Allows for piping css through multiple plugins while parsing it only once. (for prefixer)
    autoprefixer = require('autoprefixer'); // Autoprefixes css selectors and declarations for browser support.



// External dependencies that are not bundled while developing, but will be included on deployment.
var dependencies = [
	'react',
  	'react-dom'
];

// Task refire count.
var scriptsCount = 0;



// Private Functions
function bundleApp(isProduction) {
	scriptsCount++;

	// Browserify bundles all js files and modules for the front end.
	var appBundler = browserify({
    	entries: './src/main.jsx',
    	debug: true
  	});

	// During dev phase, a separate vendors.js file is created the first time gulp is run to avoid re-bundling static dependencies like react.
  	if (!isProduction && scriptsCount === 1) { // Creates vendors.js for dev environment.
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./public/js/'));
  	}

    // Make dependencies external so they dont get bundled by the app bundler. Dependencies are already bundled in vendor.js for development environments.
  	if (!isProduction) {
  		dependencies.forEach(function(dep) {
  			appBundler.external(dep);
  		})
  	}

    // Transform ES6 and JSX to ES5 with babelify.
  	appBundler
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('main.js'))
	    .pipe(gulp.dest('./public/js/'));
}



// Gulp Tasks
gulp.task('default', ['scripts','less','watch']);

gulp.task('watch', function() {
	gulp.watch(['./src/*.jsx', './src/components/*.jsx' ], ['scripts']);
    gulp.watch(['./src/less/*' ], ['less']);
});

gulp.task('scripts', function() {
    bundleApp(false);
});

gulp.task('deploy', function() {
	bundleApp(true);
});

gulp.task('less', function() { // Compiles and processes lESS files (adds in-doc sourcemap and autoprefixes css).
    gulp.src('./src/less/style.less')
        .pipe(sourcemaps.init()) // Inits sourcemap.
        .pipe(less({
            paths: [ // Folder paths for @import rules. Without this option, sourcemaps will not work.
                './src/less'
            ]
        }))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions']
            }) // Autoprefixes style if any are needed. Removes prefixes that are not need.
        ]))
        .pipe(sourcemaps.write()) // Writes sourcemap.
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/css'));
});
