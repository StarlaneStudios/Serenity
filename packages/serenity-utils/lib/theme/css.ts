export const cx = (...args: (string | undefined)[]) => {
	return args.filter(Boolean).join(' ');
};