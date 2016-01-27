// ////////////////////////////////////////
// REQUIREMENTS
// ////////////////////////////////////////
var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	sourceMaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	cssNano = require("gulp-cssnano"),
	htmlMin = require("gulp-htmlmin"),
	browserSync = require("browser-sync").create();



// ////////////////////////////////////////
// LINT TASK - Detect Errors in JS
// ////////////////////////////////////////
gulp.task("lintDetectJavascriptErrors", function() {
	return gulp.src("app/javascript/**/*/.js")
		.pipe(jshint())
		.pipe(jshint.reporter("default"));
});



// ////////////////////////////////////////
// SCRIPTS TASK - Compile and Minify
// ////////////////////////////////////////
gulp.task("compileScripts", function() {
	return gulp.src("app/javascript/**/*.js")
		.pipe(sourceMaps.init())
		.pipe(concat("main.js"))
		.pipe(uglify())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest("dist/javascript/"));
});



// ////////////////////////////////////////
// SASS TASK - Compile and Minify
// ////////////////////////////////////////
gulp.task("compileSass", function() {
	return gulp.src("app/style/*.scss")
		.pipe(concat("style.scss"))
		.pipe(sass(
				{
					onError: function(e) {
						console.log(e);
					}
				}
			)
		)
		.pipe(cssNano())
		.pipe(gulp.dest("dist/style/"));
});




// ////////////////////////////////////////
// HTML TASK - Compile and Minify
// ////////////////////////////////////////
gulp.task("compileHTML", function() {
	gulp.src("app/views/*.html")
		.pipe(htmlMin({
			collapseWhitespace: true,
			removeComments: true,
			removeAttributeQuotes: true,
			removeEmptyElements: true
		}))
		.pipe(gulp.dest("dist/"));
});



// ////////////////////////////////////////
// SERVE TASK
// ////////////////////////////////////////
gulp.task("serve", ["lintDetectJavascriptErrors", "compileScripts", "compileSass", "compileHTML"], function() {
	browserSync.init(
		{
			server: "./dist",
			// reloadDelay: 1000
		}
	);
	gulp.watch("app/javascript/**/*.js", ["lintDetectJavascriptErrors", "compileScripts"]).on("change", browserSync.reload);
	gulp.watch("app/style/*.scss", ["compileSass"]).on("change", browserSync.reload);
	gulp.watch("app/views/*.html", ["compileHTML"]).on("change", browserSync.reload);
});



// ////////////////////////////////////////
// BUILD TASK
// ////////////////////////////////////////
gulp.task("build", ["lintDetectJavascriptErrors", "compileScripts", "compileSass", "compileHTML"]);



// ////////////////////////////////////////
// DEFAULT TASK
// ////////////////////////////////////////
gulp.task("default", ["serve"]);



// ////////////////////////////////////////
// TEST TASK
// ////////////////////////////////////////
gulp.task("test", function() {
	console.log("Hello, workd!");
});





