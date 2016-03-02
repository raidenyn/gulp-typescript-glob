# gulp-typescript-glob

[Gulp](http://gulpjs.com/) plugin for [gulp-typescript](https://github.com/ivogabe/gulp-typescript) to use glob imports.

# Install

```
npm install gulp-typescript-glob --save-dev
```

# Basic Usage

main.ts

```typescript
import "./resources/*";
import "./components/**/*";

```

gulpfile.js

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsGlob = require('gulp-typescript-glob');

var tsProject = ts.createProject();

gulp.task('ts', function () {
    var tsResult = tsProject.src()
                            .pipe(tsGlob())
                            .pipe(ts(tsProject));

    return tsResult.js
                   .pipe(gulp.dest("."));
});
```

# Thanks
Project inspired by Tom Grooffer's [gulp-sass-glob](https://github.com/tomgrooffer/gulp-sass-glob).
