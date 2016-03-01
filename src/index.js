import path from 'path';
import fs from 'fs';
import through from 'through2';
import glob from 'glob';
import slash from 'slash';

export default function gulpTypescriptGlob () {
    "use strict";
    return through.obj(transform);
}

function transform (file, env, callback) {
    "use strict";

    const reg = /import\s+["'](((\.{1,2}\/)*)[^"']*?\*(\.ts|\.tsx)?)["'];?/;
    const base = path.join(path.normalize(path.dirname(file.history[0])), '/');

    let contents = file.contents.toString('utf-8');
    let result;

    while ((result = reg.exec(contents)) !== null) {
        const importRule = result[0];
        const globPattern = result[1];
        const trailers = result[2] || "";

        const files = glob.sync(path.join(base, globPattern), {
            cwd: base
        });

        const imports = [];

        files.forEach((filename) => {
            if (filename !== file.path && isTypescript(filename)) {
                // remove parent base path
                const basePath = path.join(base, trailers);

                filename = path.normalize(filename).replace(basePath, '');

                filename = filename.replace(/\.[^/.]+$/, "");

                const importItem = `import "${trailers}${slash(filename)}";`;

                imports.push(importItem);
            }
        });

        const replaceString = imports.join('\n');
        contents = contents.replace(importRule, replaceString);
        file.contents = new Buffer(contents);
    }

    callback(null, file);
}

function isTypescript (filename) {
    "use strict";
    return (!fs.statSync(filename).isDirectory() && path.extname(filename).match(/\.ts|\.tsx/i));
}