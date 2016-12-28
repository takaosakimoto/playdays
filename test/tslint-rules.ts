import {readFileSync} from 'fs';

function customRules(): string[] {
  var lintConf = JSON.parse(readFileSync('tslint.json').toString());
  return lintConf.rulesDirectory;
}


export const CODELYZER_RULES = customRules();
