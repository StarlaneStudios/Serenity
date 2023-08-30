import rootPkg from '../package.json' assert { type: 'json' }
import { globSync } from 'glob';
import fs from 'fs';

globSync('./packages/*/package.json').forEach(location => {
	const json = JSON.stringify({
		...JSON.parse(fs.readFileSync(location)),
		version: rootPkg.version
	}, null, 4);

	fs.writeFileSync(location, json.replace(/ {4}/g, '\t'))
});