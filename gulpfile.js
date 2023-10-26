const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const browsersync = require("browser-sync");

const dist = "./dist";

gulp.task("copy-html", () => {
	return gulp
		.src("./src/index.html")
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
	return gulp
		.src("./src/scss/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest(dist + "/css"))
		.pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
	gulp.src("./src/icons/**/*.*").pipe(gulp.dest(dist + "/icons"));

	return gulp
		.src("./src/img/**/*.*")
		.pipe(gulp.dest(dist + "/img"))
		.pipe(browsersync.stream());
});

gulp.task("watch", () => {
	browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true,
	});

	gulp.watch("./src/index.html", gulp.parallel("copy-html"));
	gulp.watch("./src/icons/**/*.*", gulp.parallel("copy-assets"));
	gulp.watch("./src/img/**/*.*", gulp.parallel("copy-assets"));
	gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
});

gulp.task(
	"build",
	gulp.parallel("copy-html", "copy-assets", "build-sass")
);

gulp.task("prod", () => {
	gulp.src("./src/index.html").pipe(gulp.dest(dist));
	gulp.src("./src/img/**/*.*").pipe(gulp.dest(dist + "/img"));
	gulp.src("./src/icons/**/*.*").pipe(gulp.dest(dist + "/icons"));

	return gulp
		.src("./src/scss/style.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss([autoprefixer()]))
		.pipe(cleanCSS())
		.pipe(gulp.dest(dist + "/css"));
});

gulp.task("default", gulp.parallel("watch", "build"));
