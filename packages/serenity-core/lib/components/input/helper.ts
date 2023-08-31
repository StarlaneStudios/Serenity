export function focusInput(parent: HTMLElement | undefined | null, input: HTMLInputElement | undefined | null) {

	if(!parent || !input) {
		return () => {};
	}

	const handler = (event: MouseEvent) => {

		// ignore if the input within the parent is already focused
		if (document.activeElement === input || document.activeElement === parent) {
			return;
		}

		if (event.target !== input) {
			input.focus();
		}
	}

	parent.addEventListener('click', handler, { passive: true });
	return () => parent.removeEventListener('click', handler);
}