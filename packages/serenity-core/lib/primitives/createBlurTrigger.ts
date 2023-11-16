import { createSignal } from "solid-js";

function createBlurInputTrigger(
	value?: string,
	error?: string,
	lazy?: boolean,
) {

	const [blured, setBlured] = createSignal(!!value);

	const handleBlur = () => {
		lazy && setBlured(true);
	};

	const errorValue = () => {
		
		if(!lazy) {
			return error;
		}

		return blured() ? error : undefined;
	}

	return {
		handleBlur,
		value: errorValue,
		blured
	};
}

export default createBlurInputTrigger;