import { execSync } from 'child_process';

export function runAnyway(command) {
	try {
		execSync(command);
	} catch (error) {
		// ignore 
	}
}