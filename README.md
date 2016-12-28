## Install & Start

```bash
npm install -g cordova ionic@beta karma typescript webdriver-manager typings
npm install       # or `npm run reinstall` if you get an error
npm start         # start the application (ionic serve)
```

## Run Unit Tests
```bash
npm test          # run unit tests
```

## Debug Unit tests
```bash
npm run test.watch   # in one window - build all the tests and start watching for changes
npm run karma        # start karma in debug mode: mutli run Chrome, hit `debug` to get going
```


## Emulate IOS livereload
```bash
ionic emulate ios -l -c -s --address localhost --target="iPhone-6-Plus"
```
iPhone-4s, 8.4
iPhone-5, 8.4
iPhone-5s, 8.4
iPhone-6-Plus, 8.4
iPhone-6, 8.4
iPad-2, 8.4
iPad-Retina, 8.4
iPad-Air, 8.4
Resizable-iPhone, 8.4
Resizable-iPad, 8.4

ionic plugin add cordova-plugin-facebook4 --variable APP_ID="1727533490837723" --variable APP_NAME="Playdays - Test1"

ionic plugin add cordova-plugin-facebook4 --variable APP_ID="1727532907504448" --variable APP_NAME="Playdays"
