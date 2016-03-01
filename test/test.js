import path from 'path';
import expect from 'expect.js';
import vinyl from 'vinyl-fs';
import tsGlob from '../src';

describe('gulp-typescript-glob', () => {
    "use strict";

    it('(ts) should parse a single directory AND support single and double quotes import usage', (done) => {
        const expectedResult = [
            'import "./import/_f1";',
            'import "./import/_f2";',
            'import "import/_f1";',
            'import "import/_f2";'
        ].join('\n');

        vinyl
            .src(path.join(__dirname, '/test-ts/single-directory.ts'))
            .pipe(tsGlob())
            .on('data', (file) => {
                const contents = file.contents.toString('utf-8').trim();
                expect(contents).to.equal(expectedResult.trim());
            })
            .on('end', done);
    });

    it('(ts) should parse a single directory', (done) => {
        const expectedResult = [
            'import "import/_f1";',
            'import "import/_f2";'
        ].join('\n');

        vinyl
            .src(path.join(__dirname, '/test-ts/single-directory.tsx'))
            .pipe(tsGlob())
            .on('data', (file) => {
                const contents = file.contents.toString('utf-8').trim();
                expect(contents).to.equal(expectedResult.trim());
            })
            .on('end', done);
    });

    it('(ts) should parse a directory recursively', (done) => {
        const expectedResult = [
            'import "recursive/_f1";',
            'import "recursive/_f2";',
            'import "recursive/nested/_f3";'
        ].join('\n');

        vinyl
            .src(path.join(__dirname, '/test-ts/recursive.ts'))
            .pipe(tsGlob())
            .on('data', (file) => {
                const contents = file.contents.toString('utf-8').trim();
                expect(contents).to.equal(expectedResult.trim());
            })
            .on('end', done);
    });

    it('(ts) should find multiple imports', (done) => {
        const expectedResult = [
            'import "recursive/_f1";',
            'import "recursive/_f2";',
            'import "recursive/nested/_f3";',
            'import "./import/_f1";',
            'import "./import/_f2";'
        ].join('\n');

        vinyl
            .src(path.join(__dirname, '/test-ts/multiple.ts'))
            .pipe(tsGlob())
            .on('data', (file) => {
                const contents = file.contents.toString('utf-8').trim();
                expect(contents).to.equal(expectedResult.trim());
            })
            .on('end', done);
    });

    it('(ts) should find imports in base folder', (done) => {
        const expectedResult = [
            'import "../_f1";',
            'import "../_f2";'
        ].join('\n');

        vinyl
            .src(path.join(__dirname, '/test-ts/import/deep/basefolder.ts'))
            .pipe(tsGlob())
            .on('data', (file) => {
                const contents = file.contents.toString('utf-8').trim();
                expect(contents).to.equal(expectedResult.trim());
            })
            .on('end', done);
    });
});
