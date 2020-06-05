/*
--- Day 4: Secure Container ---
You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?
*/

const min = 109165;
const max = 576723;

function meetsCriteria(password: number): boolean {
	const strPass = tostring(password);

	// check 6 digit
	if (strPass.size() !== 6) return false;
	// check within range
	if (!(password >= min && max >= password)) return false;
	// check adjacent digits
	let hasAdjacent = false;
	for (let k = 0; k < strPass.size()-1; k++) {
		let currentStr = strPass.sub(k, k);
		let nextStr = strPass.sub(k+1, k+1);

		if (currentStr === nextStr) {
			hasAdjacent = true;
		}
	}
	if (!hasAdjacent) return false;
	// check digits never decrease
	for (let k = 0; k < strPass.size()-1; k++) {
		const currentStr = strPass.sub(k, k);
		const nextStr = strPass.sub(k+1, k+1);

		if (tonumber(currentStr)! > tonumber(nextStr)!) return false;
	}

	return true;
}

let possibleCombinations = 0;
for (let i = min; i <= max; i++) {
	if (meetsCriteria(i)) {
		possibleCombinations++
	}
}

print(possibleCombinations);

export { }
