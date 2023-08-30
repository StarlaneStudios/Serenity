import rootPkg from '../package.json' assert { type: 'json' }
import { runAnyway } from './_helpers.js';

runAnyway('git reset');
runAnyway('git add ./packages/*/package.json');
runAnyway(`git commit -m "release: version ${rootPkg.version}"`);