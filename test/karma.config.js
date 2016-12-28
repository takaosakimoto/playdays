// Karma configuration
'use strict';

var argv = require('yargs').argv;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/es6-module-loader/dist/es6-module-loader.js',
      'node_modules/traceur/bin/traceur-runtime.js', // Required by PhantomJS2, otherwise it shouts ReferenceError: Can't find variable: require
      'node_modules/traceur/bin/traceur.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'test/ionic-angular.js', included: false, watched: false },
      { pattern: 'node_modules/ionic-angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/ionic-native/dist/**/*.js', included: false, watched: false, served: true},
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/lodash/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/phoenix-channels-client/index.js', included: false, watched: true },
      { pattern: 'www/build/test/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false }, // PhantomJS2 (and possibly others) might require it

      'test/test-main.js'
    ],


    // list of files to exclude
    exclude: [
      'node_modules/@angular/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*',
      'node_modules/ionic-angular/decorators/app.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'www/build/test/**/!(*.spec|*.stub).js': 'coverage',
    },

    // options on how to report coverage:
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json', subdir: '.', file: 'coverage-final.json' },
        { type: 'html' }
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // GOTCHA -- Karma proxies _everything_ through base first..
    //           Also any files you want to serve need to be in the files array above with serverd: true
    proxies: {
      // allows us to keep test code separate from app code and still have the references work
      '/base/node_modules/ionic-angular/decorators/app.js': '/base/www/build/test/app.stub.js', // stub out Ionic's @App decorator
      '/base/ionic-angular.js': '/base/test/ionic-angular.js',
      // ionic-native proxies
      '/base/ionic-native.js': '/base/node_modules/ionic-native/dist/index.js',
      '/base/ng1.js': '/base/node_modules/ionic-native/dist/ng1.js',
      '/base/util.js': '/base/node_modules/ionic-native/dist/util.js',
      '/base/plugins/actionsheet.js': '/base/node_modules/ionic-native/dist/plugins/actionsheet.js',
      '/base/plugins/appavailability.js': '/base/node_modules/ionic-native/dist/plugins/appavailability.js',
      '/base/plugins/apprate.js': '/base/node_modules/ionic-native/dist/plugins/apprate.js',
      '/base/plugins/appversion.js': '/base/node_modules/ionic-native/dist/plugins/appversion.js',
      '/base/plugins/badge.js': '/base/node_modules/ionic-native/dist/plugins/badge.js',
      '/base/plugins/barcodescanner.js': '/base/node_modules/ionic-native/dist/plugins/barcodescanner.js',
      '/base/plugins/base64togallery.js': '/base/node_modules/ionic-native/dist/plugins/base64togallery.js',
      '/base/plugins/batterystatus.js': '/base/node_modules/ionic-native/dist/plugins/batterystatus.js',
      '/base/plugins/ble.js': '/base/node_modules/ionic-native/dist/plugins/ble.js',
      '/base/plugins/calendar.js': '/base/node_modules/ionic-native/dist/plugins/calendar.js',
      '/base/plugins/contacts.js': '/base/node_modules/ionic-native/dist/plugins/contacts.js',
      '/base/plugins/clipboard.js': '/base/node_modules/ionic-native/dist/plugins/clipboard.js',
      '/base/plugins/camera.js': '/base/node_modules/ionic-native/dist/plugins/camera.js',
      '/base/plugins/devicemotion.js': '/base/node_modules/ionic-native/dist/plugins/devicemotion.js',
      '/base/plugins/datepicker.js': '/base/node_modules/ionic-native/dist/plugins/datepicker.js',
      '/base/plugins/dbmeter.js': '/base/node_modules/ionic-native/dist/plugins/dbmeter.js',
      '/base/plugins/device.js': '/base/node_modules/ionic-native/dist/plugins/device.js',
      '/base/plugins/facebook.js': '/base/node_modules/ionic-native/dist/plugins/facebook.js',
      '/base/plugins/deviceorientation.js': '/base/node_modules/ionic-native/dist/plugins/deviceorientation.js',
      '/base/plugins/dialogs.js': '/base/node_modules/ionic-native/dist/plugins/dialogs.js',
      '/base/plugins/flashlight.js': '/base/node_modules/ionic-native/dist/plugins/flashlight.js',
      '/base/plugins/geolocation.js': '/base/node_modules/ionic-native/dist/plugins/geolocation.js',
      '/base/plugins/globalization.js': ' /base/node_modules/ionic-native/dist/plugins/globalization.js',
      '/base/plugins/hotspot.js': '/base/node_modules/ionic-native/dist/plugins/hotspot.js',
      '/base/plugins/imagepicker.js': '/base/node_modules/ionic-native/dist/plugins/imagepicker.js',
      '/base/plugins/keyboard.js': '/base/node_modules/ionic-native/dist/plugins/keyboard.js',
      '/base/plugins/sms.js': '/base/node_modules/ionic-native/dist/plugins/sms.js',
      '/base/plugins/splashscreen.js': '/base/node_modules/ionic-native/dist/plugins/splashscreen.js',
      '/base/plugins/launchnavigator.js': '/base/node_modules/ionic-native/dist/plugins/launchnavigator.js',
      '/base/plugins/localnotifications.js': '/base/node_modules/ionic-native/dist/plugins/localnotifications.js',
      '/base/plugins/push.js': '/base/node_modules/ionic-native/dist/plugins/push.js',
      '/base/plugins/toast.js': '/base/node_modules/ionic-native/dist/plugins/toast.js',
      '/base/plugins/touchid.js': '/base/node_modules/ionic-native/dist/plugins/touchid.js',
      '/base/plugins/vibration.js': '/base/node_modules/ionic-native/dist/plugins/vibration.js',
      '/base/plugins/statusbar.js': '/base/node_modules/ionic-native/dist/plugins/statusbar.js',
      '/base/plugins/plugin.js': '/base/node_modules/ionic-native/dist/plugins/plugin.js',
      // rxjs proxies
      '/base/rxjs.js': '/base/node_modules/rxjs/Rx.js',
      '/base/Subject.js': '/base/node_modules/rxjs/Subject.js',
      '/base/Observable.js': '/base/node_modules/rxjs/Observable.js',
      '/base/Operator.js': '/base/node_modules/rxjs/Operator.js',
      '/base/Subscription.js': '/base/node_modules/rxjs/Subscription.js',
      '/base/Subscriber.js': '/base/node_modules/rxjs/Subscriber.js',
      '/base/subject/ReplaySubject.js': '/base/node_modules/rxjs/subject/ReplaySubject.js',
      '/base/subject/AsyncSubject.js': '/base/node_modules/rxjs/subject/AsyncSubject.js',
      '/base/subject/BehaviorSubject.js': '/base/node_modules/rxjs/subject/BehaviorSubject.js',
      '/base/Notification.js': '/base/node_modules/rxjs/Notification.js',
      '/base/observable/ConnectableObservable.js': '/base/node_modules/rxjs/observable/ConnectableObservable.js',
      '/base/util/EmptyError.js': '/base/node_modules/rxjs/util/EmptyError.js',
      '/base/util/ArgumentOutOfRangeError.js': '/base/node_modules/rxjs/util/ArgumentOutOfRangeError.js',
      '/base/util/ObjectUnsubscribedError.js': '/base/node_modules/rxjs/util/ObjectUnsubscribedError.js',
      '/base/scheduler/queue.js': '/base/node_modules/rxjs/scheduler/queue.js',
      '/base/scheduler/asap.js': '/base/node_modules/rxjs/scheduler/asap.js',
      '/base/symbol/rxSubscriber.js': '/base/node_modules/rxjs/symbol/rxSubscriber.js',
      '/base/subject/SubjectSubscription.js': '/base/node_modules/rxjs/subject/SubjectSubscription.js',
      '/base/util/throwError.js': '/base/node_modules/rxjs/util/throwError.js',
      '/base/util/root.js': '/base/node_modules/rxjs/util/root.js',
      '/base/util/toSubscriber.js': '/base/node_modules/rxjs/util/toSubscriber.js',
      '/base/util/SymbolShim.js': '/base/node_modules/rxjs/util/SymbolShim.js',
      '/base/util/tryCatch.js': '/base/node_modules/rxjs/util/tryCatch.js',
      '/base/util/errorObject.js': '/base/node_modules/rxjs/util/errorObject.js',
      '/base/add/observable/combineLatest.js': '/base/node_modules/rxjs/add/observable/combineLatest.js',
      '/base/add/observable/concat.js': '/base/node_modules/rxjs/add/observable/concat.js',
      '/base/add/observable/merge.js': '/base/node_modules/rxjs/add/observable/merge.js',
      '/base/add/observable/bindCallback.js': '/base/node_modules/rxjs/add/observable/bindCallback.js',
      '/base/add/observable/race.js': '/base/node_modules/rxjs/add/observable/race.js',
      '/base/add/observable/bindNodeCallback.js': '/base/node_modules/rxjs/add/observable/bindNodeCallback.js',
      '/base/add/observable/defer.js': '/base/node_modules/rxjs/add/observable/defer.js',
      '/base/add/observable/empty.js': '/base/node_modules/rxjs/add/observable/empty.js',
      '/base/add/observable/forkJoin.js': '/base/node_modules/rxjs/add/observable/forkJoin.js',
      '/base/add/observable/from.js': '/base/node_modules/rxjs/add/observable/from.js',
      '/base/add/observable/fromArray.js': '/base/node_modules/rxjs/add/observable/fromArray.js',
      '/base/add/observable/fromEvent.js': '/base/node_modules/rxjs/add/observable/fromEvent.js',
      '/base/add/observable/fromEventPattern.js': '/base/node_modules/rxjs/add/observable/fromEventPattern.js',
      '/base/add/observable/fromPromise.js': '/base/node_modules/rxjs/add/observable/fromPromise.js',
      '/base/add/observable/interval.js': '/base/node_modules/rxjs/add/observable/interval.js',
      '/base/add/observable/never.js': '/base/node_modules/rxjs/add/observable/never.js',
      '/base/add/observable/throw.js': '/base/node_modules/rxjs/add/observable/throw.js',
      '/base/add/observable/range.js': '/base/node_modules/rxjs/add/observable/range.js',
      '/base/add/observable/timer.js': '/base/node_modules/rxjs/add/observable/timer.js',
      '/base/add/observable/zip.js': '/base/node_modules/rxjs/add/observable/zip.js',
      '/base/add/operator/buffer.js': '/base/node_modules/rxjs/add/operator/buffer.js',
      '/base/add/operator/bufferCount.js': '/base/node_modules/rxjs/add/operator/bufferCount.js',
      '/base/add/operator/bufferTime.js': '/base/node_modules/rxjs/add/operator/bufferTime.js',
      '/base/add/operator/bufferWhen.js': '/base/node_modules/rxjs/add/operator/bufferWhen.js',
      '/base/add/operator/bufferToggle.js': '/base/node_modules/rxjs/add/operator/bufferToggle.js',
      '/base/add/operator/cache.js': '/base/node_modules/rxjs/add/operator/cache.js',
      '/base/add/operator/catch.js': '/base/node_modules/rxjs/add/operator/catch.js',
      '/base/add/operator/combineAll.js': '/base/node_modules/rxjs/add/operator/combineAll.js',
      '/base/add/operator/combineLatest.js': '/base/node_modules/rxjs/add/operator/combineLatest.js',
      '/base/add/operator/concat.js': '/base/node_modules/rxjs/add/operator/concat.js',
      '/base/add/operator/concatAll.js': '/base/node_modules/rxjs/add/operator/concatAll.js',
      '/base/add/operator/concatMap.js': '/base/node_modules/rxjs/add/operator/concatMap.js',
      '/base/add/operator/concatMapTo.js': '/base/node_modules/rxjs/add/operator/concatMapTo.js',
      '/base/add/operator/count.js': '/base/node_modules/rxjs/add/operator/count.js',
      '/base/add/operator/dematerialize.js': '/base/node_modules/rxjs/add/operator/dematerialize.js',
      '/base/add/operator/debounce.js': '/base/node_modules/rxjs/add/operator/debounce.js',
      '/base/add/operator/defaultIfEmpty.js': '/base/node_modules/rxjs/add/operator/defaultIfEmpty.js',
      '/base/add/operator/debounceTime.js': '/base/node_modules/rxjs/add/operator/debounceTime.js',
      '/base/add/operator/delay.js': '/base/node_modules/rxjs/add/operator/delay.js',
      '/base/add/operator/delayWhen.js': '/base/node_modules/rxjs/add/operator/delayWhen.js',
      '/base/add/operator/distinctUntilChanged.js': '/base/node_modules/rxjs/add/operator/distinctUntilChanged.js',
      '/base/add/operator/do.js': '/base/node_modules/rxjs/add/operator/do.js',
      '/base/add/operator/expand.js': '/base/node_modules/rxjs/add/operator/expand.js',
      '/base/add/operator/filter.js': '/base/node_modules/rxjs/add/operator/filter.js',
      '/base/add/operator/finally.js': '/base/node_modules/rxjs/add/operator/finally.js',
      '/base/add/operator/first.js': '/base/node_modules/rxjs/add/operator/first.js',
      '/base/add/operator/groupBy.js': '/base/node_modules/rxjs/add/operator/groupBy.js',
      '/base/add/operator/ignoreElements.js': '/base/node_modules/rxjs/add/operator/ignoreElements.js',
      '/base/add/operator/inspect.js': '/base/node_modules/rxjs/add/operator/inspect.js',
      '/base/add/operator/inspectTime.js': '/base/node_modules/rxjs/add/operator/inspectTime.js',
      '/base/add/operator/every.js': '/base/node_modules/rxjs/add/operator/every.js',
      '/base/add/operator/last.js': '/base/node_modules/rxjs/add/operator/last.js',
      '/base/add/operator/let.js': '/base/node_modules/rxjs/add/operator/let.js',
      '/base/add/operator/map.js': '/base/node_modules/rxjs/add/operator/map.js',
      '/base/add/operator/mapTo.js': '/base/node_modules/rxjs/add/operator/mapTo.js',
      '/base/add/operator/materialize.js': '/base/node_modules/rxjs/add/operator/materialize.js',
      '/base/add/operator/merge.js': '/base/node_modules/rxjs/add/operator/merge.js',
      '/base/add/operator/mergeAll.js': '/base/node_modules/rxjs/add/operator/mergeAll.js',
      '/base/add/operator/mergeMap.js': '/base/node_modules/rxjs/add/operator/mergeMap.js',
      '/base/add/operator/mergeMapTo.js': '/base/node_modules/rxjs/add/operator/mergeMapTo.js',
      '/base/add/operator/multicast.js': '/base/node_modules/rxjs/add/operator/multicast.js',
      '/base/add/operator/observeOn.js': '/base/node_modules/rxjs/add/operator/observeOn.js',
      '/base/add/operator/partition.js': '/base/node_modules/rxjs/add/operator/partition.js',
      '/base/add/operator/pluck.js': '/base/node_modules/rxjs/add/operator/pluck.js',
      '/base/add/operator/publish.js': '/base/node_modules/rxjs/add/operator/publish.js',
      '/base/add/operator/publishBehavior.js': '/base/node_modules/rxjs/add/operator/publishBehavior.js',
      '/base/add/operator/publishReplay.js': '/base/node_modules/rxjs/add/operator/publishReplay.js',
      '/base/add/operator/publishLast.js': '/base/node_modules/rxjs/add/operator/publishLast.js',
      '/base/add/operator/reduce.js': '/base/node_modules/rxjs/add/operator/reduce.js',
      '/base/add/operator/race.js': '/base/node_modules/rxjs/add/operator/race.js',
      '/base/add/operator/repeat.js': '/base/node_modules/rxjs/add/operator/repeat.js',
      '/base/add/operator/retry.js': '/base/node_modules/rxjs/add/operator/retry.js',
      '/base/add/operator/retryWhen.js': '/base/node_modules/rxjs/add/operator/retryWhen.js',
      '/base/add/operator/sampleTime.js': '/base/node_modules/rxjs/add/operator/sampleTime.js',
      '/base/add/operator/sample.js': '/base/node_modules/rxjs/add/operator/sample.js',
      '/base/add/operator/scan.js': '/base/node_modules/rxjs/add/operator/scan.js',
      '/base/add/operator/share.js': '/base/node_modules/rxjs/add/operator/share.js',
      '/base/add/operator/single.js': '/base/node_modules/rxjs/add/operator/single.js',
      '/base/add/operator/skipUntil.js': '/base/node_modules/rxjs/add/operator/skipUntil.js',
      '/base/add/operator/skip.js': '/base/node_modules/rxjs/add/operator/skip.js',
      '/base/add/operator/skipWhile.js': '/base/node_modules/rxjs/add/operator/skipWhile.js',
      '/base/add/operator/startWith.js': '/base/node_modules/rxjs/add/operator/startWith.js',
      '/base/add/operator/switch.js': '/base/node_modules/rxjs/add/operator/switch.js',
      '/base/add/operator/subscribeOn.js': '/base/node_modules/rxjs/add/operator/subscribeOn.js',
      '/base/add/operator/switchMap.js': '/base/node_modules/rxjs/add/operator/switchMap.js',
      '/base/add/operator/switchMapTo.js': '/base/node_modules/rxjs/add/operator/switchMapTo.js',
      '/base/add/operator/take.js': '/base/node_modules/rxjs/add/operator/take.js',
      '/base/add/operator/takeLast.js': '/base/node_modules/rxjs/add/operator/takeLast.js',
      '/base/add/operator/takeUntil.js': '/base/node_modules/rxjs/add/operator/takeUntil.js',
      '/base/add/operator/takeWhile.js': '/base/node_modules/rxjs/add/operator/takeWhile.js',
      '/base/add/operator/throttle.js': '/base/node_modules/rxjs/add/operator/throttle.js',
      '/base/add/operator/throttleTime.js': '/base/node_modules/rxjs/add/operator/throttleTime.js',
      '/base/add/operator/timeout.js': '/base/node_modules/rxjs/add/operator/timeout.js',
      '/base/add/operator/timeoutWith.js': '/base/node_modules/rxjs/add/operator/timeoutWith.js',
      '/base/add/operator/toArray.js': '/base/node_modules/rxjs/add/operator/toArray.js',
      '/base/add/operator/toPromise.js': '/base/node_modules/rxjs/add/operator/toPromise.js',
      '/base/add/operator/window.js': '/base/node_modules/rxjs/add/operator/window.js',
      '/base/add/operator/windowCount.js': '/base/node_modules/rxjs/add/operator/windowCount.js',
      '/base/add/operator/windowToggle.js': '/base/node_modules/rxjs/add/operator/windowToggle.js',
      '/base/add/operator/windowTime.js': '/base/node_modules/rxjs/add/operator/windowTime.js',
      '/base/add/operator/windowWhen.js': '/base/node_modules/rxjs/add/operator/windowWhen.js',
      '/base/add/operator/withLatestFrom.js': '/base/node_modules/rxjs/add/operator/withLatestFrom.js',
      '/base/add/operator/zip.js': '/base/node_modules/rxjs/add/operator/zip.js',
      '/base/add/operator/zipAll.js': '/base/node_modules/rxjs/add/operator/zipAll.js',
      '/base/operator/combineLatest.js': '/base/node_modules/rxjs/operator/combineLatest.js',
      '/base/operator/concat.js': '/base/node_modules/rxjs/operator/concat.js',
      '/base/operator/merge.js': '/base/node_modules/rxjs/operator/merge.js',
      '/base/operator/race.js': '/base/node_modules/rxjs/operator/race.js',
      '/base/observable/BoundCallbackObservable.js': '/base/node_modules/rxjs/observable/BoundCallbackObservable.js',
      '/base/observable/DeferObservable.js': '/base/node_modules/rxjs/observable/DeferObservable.js',
      '/base/observable/BoundNodeCallbackObservable.js': '/base/node_modules/rxjs/observable/BoundNodeCallbackObservable.js',
      '/base/observable/EmptyObservable.js': '/base/node_modules/rxjs/observable/EmptyObservable.js',
      '/base/observable/ForkJoinObservable.js': '/base/node_modules/rxjs/observable/ForkJoinObservable.js',
      '/base/observable/FromObservable.js': '/base/node_modules/rxjs/observable/FromObservable.js',
      '/base/observable/ArrayObservable.js': '/base/node_modules/rxjs/observable/ArrayObservable.js',
      '/base/observable/FromEventObservable.js': '/base/node_modules/rxjs/observable/FromEventObservable.js',
      '/base/observable/FromEventPatternObservable.js': '/base/node_modules/rxjs/observable/FromEventPatternObservable.js',
      '/base/observable/PromiseObservable.js': '/base/node_modules/rxjs/observable/PromiseObservable.js',
      '/base/observable/IntervalObservable.js': '/base/node_modules/rxjs/observable/IntervalObservable.js',
      '/base/observable/NeverObservable.js': '/base/node_modules/rxjs/observable/NeverObservable.js',
      '/base/observable/RangeObservable.js': '/base/node_modules/rxjs/observable/RangeObservable.js',
      '/base/observable/ErrorObservable.js': '/base/node_modules/rxjs/observable/ErrorObservable.js',
      '/base/observable/TimerObservable.js': '/base/node_modules/rxjs/observable/TimerObservable.js',
      '/base/operator/zip.js': '/base/node_modules/rxjs/operator/zip.js',
      '/base/operator/buffer.js': '/base/node_modules/rxjs/operator/buffer.js',
      '/base/operator/bufferCount.js': '/base/node_modules/rxjs/operator/bufferCount.js',
      '/base/operator/bufferTime.js': '/base/node_modules/rxjs/operator/bufferTime.js',
      '/base/operator/bufferToggle.js': '/base/node_modules/rxjs/operator/bufferToggle.js',
      '/base/operator/bufferWhen.js': '/base/node_modules/rxjs/operator/bufferWhen.js',
      '/base/operator/cache.js': '/base/node_modules/rxjs/operator/cache.js',
      '/base/operator/catch.js': '/base/node_modules/rxjs/operator/catch.js',
      '/base/operator/combineAll.js': '/base/node_modules/rxjs/operator/combineAll.js',
      '/base/operator/concatAll.js': '/base/node_modules/rxjs/operator/concatAll.js',
      '/base/operator/concatMapTo.js': '/base/node_modules/rxjs/operator/concatMapTo.js',
      '/base/operator/concatMap.js': '/base/node_modules/rxjs/operator/concatMap.js',
      '/base/operator/count.js': '/base/node_modules/rxjs/operator/count.js',
      '/base/operator/dematerialize.js': '/base/node_modules/rxjs/operator/dematerialize.js',
      '/base/operator/debounce.js': '/base/node_modules/rxjs/operator/debounce.js',
      '/base/operator/defaultIfEmpty.js': '/base/node_modules/rxjs/operator/defaultIfEmpty.js',
      '/base/operator/debounceTime.js': '/base/node_modules/rxjs/operator/debounceTime.js',
      '/base/operator/delayWhen.js': '/base/node_modules/rxjs/operator/delayWhen.js',
      '/base/operator/distinctUntilChanged.js': '/base/node_modules/rxjs/operator/distinctUntilChanged.js',
      '/base/operator/delay.js': '/base/node_modules/rxjs/operator/delay.js',
      '/base/operator/do.js': '/base/node_modules/rxjs/operator/do.js',
      '/base/operator/expand.js': '/base/node_modules/rxjs/operator/expand.js',
      '/base/operator/groupBy.js': '/base/node_modules/rxjs/operator/groupBy.js',
      '/base/operator/finally.js': '/base/node_modules/rxjs/operator/finally.js',
      '/base/operator/first.js': '/base/node_modules/rxjs/operator/first.js',
      '/base/operator/inspect.js': '/base/node_modules/rxjs/operator/inspect.js',
      '/base/operator/inspectTime.js': '/base/node_modules/rxjs/operator/inspectTime.js',
      '/base/operator/ignoreElements.js': '/base/node_modules/rxjs/operator/ignoreElements.js',
      '/base/operator/filter.js': '/base/node_modules/rxjs/operator/filter.js',
      '/base/operator/last.js': '/base/node_modules/rxjs/operator/last.js',
      '/base/operator/let.js': '/base/node_modules/rxjs/operator/let.js',
      '/base/operator/map.js': '/base/node_modules/rxjs/operator/map.js',
      '/base/operator/every.js': '/base/node_modules/rxjs/operator/every.js',
      '/base/operator/materialize.js': '/base/node_modules/rxjs/operator/materialize.js',
      '/base/operator/mergeAll.js': '/base/node_modules/rxjs/operator/mergeAll.js',
      '/base/operator/mergeMap.js': '/base/node_modules/rxjs/operator/mergeMap.js',
      '/base/operator/mergeMapTo.js': '/base/node_modules/rxjs/operator/mergeMapTo.js',
      '/base/operator/mapTo.js': '/base/node_modules/rxjs/operator/mapTo.js',
      '/base/operator/multicast.js': '/base/node_modules/rxjs/operator/multicast.js',
      '/base/operator/observeOn.js': '/base/node_modules/rxjs/operator/observeOn.js',
      '/base/operator/partition.js': '/base/node_modules/rxjs/operator/partition.js',
      '/base/operator/pluck.js': '/base/node_modules/rxjs/operator/pluck.js',
      '/base/operator/publishBehavior.js': '/base/node_modules/rxjs/operator/publishBehavior.js',
      '/base/operator/publishReplay.js': '/base/node_modules/rxjs/operator/publishReplay.js',
      '/base/operator/publishLast.js': '/base/node_modules/rxjs/operator/publishLast.js',
      '/base/operator/publish.js': '/base/node_modules/rxjs/operator/publish.js',
      '/base/operator/reduce.js': '/base/node_modules/rxjs/operator/reduce.js',
      '/base/operator/repeat.js': '/base/node_modules/rxjs/operator/repeat.js',
      '/base/operator/retry.js': '/base/node_modules/rxjs/operator/retry.js',
      '/base/operator/retryWhen.js': '/base/node_modules/rxjs/operator/retryWhen.js',
      '/base/operator/sample.js': '/base/node_modules/rxjs/operator/sample.js',
      '/base/operator/share.js': '/base/node_modules/rxjs/operator/share.js',
      '/base/operator/sampleTime.js': '/base/node_modules/rxjs/operator/sampleTime.js',
      '/base/operator/scan.js': '/base/node_modules/rxjs/operator/scan.js',
      '/base/operator/skipUntil.js': '/base/node_modules/rxjs/operator/skipUntil.js',
      '/base/operator/skipWhile.js': '/base/node_modules/rxjs/operator/skipWhile.js',
      '/base/operator/single.js': '/base/node_modules/rxjs/operator/single.js',
      '/base/operator/skip.js': '/base/node_modules/rxjs/operator/skip.js',
      '/base/operator/subscribeOn.js': '/base/node_modules/rxjs/operator/subscribeOn.js',
      '/base/operator/switch.js': '/base/node_modules/rxjs/operator/switch.js',
      '/base/operator/switchMap.js': '/base/node_modules/rxjs/operator/switchMap.js',
      '/base/operator/startWith.js': '/base/node_modules/rxjs/operator/startWith.js',
      '/base/operator/take.js': '/base/node_modules/rxjs/operator/take.js',
      '/base/operator/takeLast.js': '/base/node_modules/rxjs/operator/takeLast.js',
      '/base/operator/takeUntil.js': '/base/node_modules/rxjs/operator/takeUntil.js',
      '/base/operator/takeWhile.js': '/base/node_modules/rxjs/operator/takeWhile.js',
      '/base/operator/switchMapTo.js': '/base/node_modules/rxjs/operator/switchMapTo.js',
      '/base/operator/throttle.js': '/base/node_modules/rxjs/operator/throttle.js',
      '/base/operator/throttleTime.js': '/base/node_modules/rxjs/operator/throttleTime.js',
      '/base/operator/timeout.js': '/base/node_modules/rxjs/operator/timeout.js',
      '/base/operator/timeoutWith.js': '/base/node_modules/rxjs/operator/timeoutWith.js',
      '/base/operator/toArray.js': '/base/node_modules/rxjs/operator/toArray.js',
      '/base/operator/windowTime.js': '/base/node_modules/rxjs/operator/windowTime.js',
      '/base/operator/toPromise.js': '/base/node_modules/rxjs/operator/toPromise.js',
      '/base/operator/window.js': '/base/node_modules/rxjs/operator/window.js',
      '/base/operator/windowCount.js': '/base/node_modules/rxjs/operator/windowCount.js',
      '/base/operator/windowWhen.js': '/base/node_modules/rxjs/operator/windowWhen.js',
      '/base/operator/withLatestFrom.js': '/base/node_modules/rxjs/operator/withLatestFrom.js',
      '/base/operator/zipAll.js': '/base/node_modules/rxjs/operator/zipAll.js',
      '/base/util/isArray.js': '/base/node_modules/rxjs/util/isArray.js',
      '/base/operator/windowToggle.js': '/base/node_modules/rxjs/operator/windowToggle.js',
      '/base/util/isObject.js': '/base/node_modules/rxjs/util/isObject.js',
      '/base/util/isFunction.js': '/base/node_modules/rxjs/util/isFunction.js',
      '/base/Observer.js': '/base/node_modules/rxjs/Observer.js',
      '/base/scheduler/AsapScheduler.js': '/base/node_modules/rxjs/scheduler/AsapScheduler.js',
      '/base/scheduler/QueueScheduler.js': '/base/node_modules/rxjs/scheduler/QueueScheduler.js',
      '/base/util/isScheduler.js': '/base/node_modules/rxjs/util/isScheduler.js',
      '/base/OuterSubscriber.js': '/base/node_modules/rxjs/OuterSubscriber.js',
      '/base/util/subscribeToResult.js': '/base/node_modules/rxjs/util/subscribeToResult.js',
      '/base/util/isPromise.js': '/base/node_modules/rxjs/util/isPromise.js',
      '/base/observable/IteratorObservable.js': '/base/node_modules/rxjs/observable/IteratorObservable.js',
      '/base/observable/ArrayLikeObservable.js': '/base/node_modules/rxjs/observable/ArrayLikeObservable.js',
      '/base/observable/ScalarObservable.js': '/base/node_modules/rxjs/observable/ScalarObservable.js',
      '/base/util/isNumeric.js': '/base/node_modules/rxjs/util/isNumeric.js',
      '/base/util/noop.js': '/base/node_modules/rxjs/util/noop.js',
      '/base/util/isDate.js': '/base/node_modules/rxjs/util/isDate.js',
      '/base/util/Map.js': '/base/node_modules/rxjs/util/Map.js',
      '/base/util/FastMap.js': '/base/node_modules/rxjs/util/FastMap.js',
      '/base/util/not.js': '/base/node_modules/rxjs/util/not.js',
      '/base/observable/SubscribeOnObservable.js': '/base/node_modules/rxjs/observable/SubscribeOnObservable.js',
      '/base/scheduler/AsapAction.js': '/base/node_modules/rxjs/scheduler/AsapAction.js',
      '/base/scheduler/QueueAction.js': '/base/node_modules/rxjs/scheduler/QueueAction.js',
      '/base/scheduler/FutureAction.js': '/base/node_modules/rxjs/scheduler/FutureAction.js',
      '/base/InnerSubscriber.js': '/base/node_modules/rxjs/InnerSubscriber.js',
      '/base/util/MapPolyfill.js': '/base/node_modules/rxjs/util/MapPolyfill.js',
      '/base/util/Immediate.js': '/base/node_modules/rxjs/util/Immediate.js',
      '/base/lodash.js': '/base/node_modules/lodash.js',
      '/base/phoenix-channels-client.js': '/base/node_modules/phoenix-channels-client/index.js',

    },



    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS',
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Passing command line arguments to tests
    client: {
      files: argv.files
    }
  });

  if (process.env.APPVEYOR) {
    config.browsers = ['IE'];
    config.singleRun = true;
    config.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
  }

  if (process.env.TRAVIS || process.env.CIRCLECI) {
    config.browsers = ['Chrome_travis_ci'];
    config.singleRun = true;
  }
};
