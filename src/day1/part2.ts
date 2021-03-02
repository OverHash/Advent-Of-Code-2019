/*
Your puzzle answer was 232.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
Now, given the same instructions, find the position of the first character that causes him to enter the basement (floor -1). The first character in the instructions has position 1, the second character has position 2, and so on.

For example:

) causes him to enter the basement at character position 1.
()()) causes him to enter the basement at character position 5.
What is the position of the character that causes Santa to first enter the basement?
*/

import input from './input';

let floor = 0;
let pos = 0;
for (const word of input.gmatch('.')) {
	pos += 1;

	const char = word[0];

	if (char === "(") {
		floor += 1;
	} else {
		floor -= 1;
	}

	if (floor === -1) {
		break;
	}
}

export const output = pos;
