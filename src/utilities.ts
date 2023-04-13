export const pascalCaseToSpaceSeparated = (s: string) => {
	let acc = '';
	for (const [index, char] of Array.from(s).entries()) {
		if (
			index > 0 &&
			(/[A-Z]/.test(char) ||
				// if current character is a number and the previous character isn't
				(/[0-9]/.test(char) && !/[0-9]/.test(s[index - 1])))
		) {
			acc += ' ';
		}

		acc += char;
	}

	return acc;
};

export const toTitleCase = (s: string) => [s[0].toUpperCase(), s.slice(1).toLowerCase()].join('');
