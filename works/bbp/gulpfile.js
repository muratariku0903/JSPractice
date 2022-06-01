import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass';
const sassCompiler = gulpSass(sass);


const sassCompile = () => {
    console.log('hello');
    return gulp.src('./src/scss/**/**.scss').pipe(sassCompiler()).pipe(gulp.dest('./assets/css'));
}

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/**.scss', sassCompile)
});
