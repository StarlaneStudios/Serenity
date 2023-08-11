export const cx = (...args: string[]) => {
	return args.filter(Boolean).join(' ');
};