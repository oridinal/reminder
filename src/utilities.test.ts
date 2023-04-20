import { describe, expect, it } from 'vitest';

import { toSpaceSeparatedPascalCase } from './utilities';

describe('toSpaceSeparatedPascalCase', () => {
	it('should convert correctly', () => {
		const predicates = [
			['PascalCase', 'Pascal Case'],
			['DailyEvent', 'Daily Event'],
			['StartingIn10Minutes', 'Starting In 10 Minutes'],
		];

		for (const [left, right] of predicates) {
			expect(toSpaceSeparatedPascalCase(left), `${left} -> ${right}`).toBe(right);
		}
	});
});
