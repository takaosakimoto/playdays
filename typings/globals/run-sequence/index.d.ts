// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/run-sequence/run-sequence.d.ts
declare module "run-sequence" {
    import gulp = require('gulp');

    interface IRunSequence {
        (...streams: (string | string[] | gulp.TaskCallback)[]): NodeJS.ReadWriteStream;

        use(gulp: gulp.Gulp): IRunSequence;
    }

    var _tmp: IRunSequence;
    export = _tmp;
}