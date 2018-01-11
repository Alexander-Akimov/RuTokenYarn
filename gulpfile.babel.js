import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
//import { exec } from 'child_process';

const paths = {
  allSrcJs: 'src/**/*.js',
  libDir: 'build/lib',
  pageHtml: 'src/*.html',
  build: 'build',
  libSrc: 'src/libs/**',
  libDest: 'build/libs',
  ownScripts: ['src/present.js', 'src/index.js'],
};

gulp.task('clean', () => del(paths.build));

gulp.task('pages', () => gulp.src(paths.pageHtml).pipe(gulp.dest(paths.build)));

gulp.task('libs', () => gulp.src(paths.libSrc) .pipe(gulp.dest(paths.libDest)));

gulp.task('deps', ['libs'], () => 
  browserify('src/dependencies.js')
    .bundle()
    .pipe(source('dependencies.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.build)));

// gulp.task('build', ['clean'], () => 
//   gulp.src(paths.allSrcJs)
//     .pipe(babel())
//     .pipe(gulp.dest(paths.libDir)));

gulp.task('scripts', ['deps'], () =>
  gulp.src(paths.ownScripts)
    .pipe(gulp.dest(paths.build)));

// gulp.task('main', ['build'], (callback) => 
//   exec(`node ${paths.libDir}`, (error, stdout) => {
//     console.log(stdout);
//     return callback(error);
//   }));
//gulp.task('watch', () => gulp.watch(paths.allSrcJs, ['main']));
gulp.task('main', ['clean'], () => gulp.start('pages', 'scripts'));

gulp.task('watch', () => gulp.watch(paths.allSrcJs, ['main']));

gulp.task('default', ['watch', 'main']); // сперва main затем watch