'use strict';

import {readFileSync} from 'fs';

function customRules(): string[] {
  var lintConf = JSON.parse(readFileSync('tslint.json').toString());
  return lintConf.rulesDirectory;
}

export const APP_DIR: string     = 'app';
export const TEST_DIR: string    = 'test';
export const TYPINGS_DIR: string = 'typings';
export const DIST_DIR: string    = 'www/build';
export const TEST_DEST: string   = `${DIST_DIR}/test`;
export const CODELYZER_RULES: string[] = customRules();