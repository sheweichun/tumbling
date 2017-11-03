
require('babel-core/register');
const resolve = require('rollup-plugin-node-resolve')
,gulp = require('gulp')
,babel = require('gulp-babel')
,gulpSequence = require('gulp-sequence')
,concat = require('gulp-concat')
,del = require('del')
,less = require('gulp-less')
,rollup = require('rollup')
,commonjs = require('rollup-plugin-commonjs')
,plumber = require('gulp-plumber')
,path = require('path')
,manglejs = require('rollup-plugin-manglejs').default
,uglify = require('rollup-plugin-uglify')
,DIR = {
  pwd:'./',
  dist:'dist',
  src: ['src/**/*.js', '!src/**/*.test.js'],
  less:['src/**/*.less'],
  lib: 'lib',
  es6: 'es'
};

const commonjsBabelConfig = {
  'presets': [
    'es2015',
    'stage-0'
  ]
};

const esBabelConfig = {
  'presets': [
    [
      'es2015',
      {
        'modules': false
      }
    ],
    'stage-0'
  ]
};

function upper(name) {
  var index = name.lastIndexOf('\/');
  if (index > -1) {
    name = name.substring(index + 1);
  }
  var arr = name.split('-');
  return arr.map(function(word) {
    return word.toLowerCase().replace(/^\S/g, function(s) {
      return s.toUpperCase();
    });
  }).join('');
}

gulp.task('clean', () => {
  return del([DIR.lib, DIR.es6,DIR.dist]);
});


gulp.task('bundle',  async function() {
    const bundle = await rollup.rollup({
        input: './lib/index.js',
        plugins:[
            manglejs({
                parse:{
                    sourceType:'module'
                }   
            }),
            commonjs()
        ]
    });
    await bundle.write({
        file: 'dist/tumbling.js',
        format: 'umd',
        name:'Tumbling',
        sourcemap: true
    });
});

gulp.task('bundle:ugly', async function() {
    const bundle = await rollup.rollup({
        // input: './lib/index.js',
        input:'./test.js',
        plugins:[
            commonjs(),
            manglejs({
                parse:{
                    sourceType:'module'
                }   
            }),
            uglify({
            })
        ]
    });
    await bundle.write({
        file: 'dist/tumbling.min.js',
        format: 'umd',
        name:'Tumbling',
        sourcemap: true
    })
});

gulp.task('less',()=>{
    return gulp.src(DIR.less)
    .pipe(less())
    .pipe(concat('index.css'))
    .pipe(gulp.dest(DIR.pwd))
})


gulp.task('build:commonjs', (cb) => {
  return gulp.src(DIR.src)
    .pipe(plumber())
    .pipe(babel(commonjsBabelConfig))
    .pipe(gulp.dest(DIR.lib));
});

gulp.task('build:es', (cb) => {
  process.env.BABEL_ENV = 'development';
  return gulp.src(DIR.src)
    .pipe(plumber())
    .pipe(babel(esBabelConfig))
    .pipe(gulp.dest(DIR.es6));
});

gulp.task('build', (cb) => {
//   process.env.NODE_ENV = 'production';
  return gulpSequence(
    'clean',
    ['less','build:commonjs', 'build:es'],
    ['bundle','bundle:ugly']
  )(cb);
});

gulp.task('watch', (cb) => {
  // process.env.NODE_ENV = 'production';
  gulp.watch([DIR.src], ['build:commonjs']);
});
