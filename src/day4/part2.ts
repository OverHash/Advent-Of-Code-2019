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

Your puzzle answer was 2814.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

Given this additional criterion, but still ignoring the range rule, the following are now true:

112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
How many different passwords within the range given in your puzzle input meet all of the criteria?
*/
const min = 109165;
const max = 576723;

function meetsCriteria(password: number): boolean {
	const strPass = tostring(password);

	// check 6 digit
	if (strPass.size() !== 6) return false;
	// check within range
	if (!(password >= min && max >= password)) return false;
	// check digits never decrease
	for (let k = 0; k < strPass.size() - 1; k++) {
		const currentStr = strPass.sub(k, k);
		const nextStr = strPass.sub(k + 1, k + 1);

		if (tonumber(currentStr)! > tonumber(nextStr)!) return false;
	}
	// check adjacent digits
	let sections: Array<[string, number]> = [];
	for (let char of strPass) {
		const sectionData = sections[sections.size() - 1];
		
		if (sectionData && sectionData[0] === char) {
			sectionData[1]++;
		} else {
			sections[sections.size()] = ([char, 1])
		}
	}
	let isAdjacentDigit = false;
	for (const section of sections) {
		if (section[1] === 2) {
			isAdjacentDigit = true;
		}
	}
	if (!isAdjacentDigit) return false;

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
