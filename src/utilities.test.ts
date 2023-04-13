import { describe, expect, it } from 'vitest';
import { pascalCaseToSpaceSeparated, toTitleCase } from './utilities';

describe('pascalCaseToSpaceSeparated', () => {
	it('should convert correctly', () => {
		const predicates = [
			['PascalCase', 'Pascal Case'],
			['RooDailyEvent', 'Roo Daily Event'],
			['StartingIn10Minutes', 'Starting In 10 Minutes'],
		];

		for (const [left, right] of predicates) {
			expect(pascalCaseToSpaceSeparated(left), `${left} -> ${right}`).toBe(right);
		}
	});
});

describe('toTitleCase', () => {
	it('should convert correctly', () => {
		const predicates = [
			['Pascal Case', 'Pascal case'],
			['Roo Daily Event', 'Roo daily event'],
			['Starting In 10 Minutes', 'Starting in 10 minutes'],
		];

		for (const [left, right] of predicates) {
			expect(toTitleCase(left), `${left} -> ${right}`).toBe(right);
		}
	});
});
