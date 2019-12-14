/*
--- Day 1: The Tyranny of the Rocket Equation ---
Santa has become stranded at the edge of the Solar System while delivering presents to other planets! To accurately calculate his position in space, safely align his warp drive, and return to Earth in time to save Christmas, he needs you to bring him measurements from fifty stars.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

The Elves quickly load you into a spacecraft and prepare to launch.

At the first Go / No Go poll, every Elf is Go until the Fuel Counter-Upper. They haven't determined the amount of fuel required yet.

Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

For example:

For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
For a mass of 1969, the fuel required is 654.
For a mass of 100756, the fuel required is 33583.
The Fuel Counter-Upper needs to know the total fuel requirement. To find it, individually calculate the fuel needed for the mass of each module (your puzzle input), then add together all the fuel values.

What is the sum of the fuel requirements for all of the modules on your spacecraft?
--- Part Two ---
During the second Go / No Go poll, the Elf in charge of the Rocket Equation Double-Checker stops the launch sequence. Apparently, you forgot to include additional fuel for the fuel you just added.

Fuel itself requires fuel just like a module - take its mass, divide by three, round down, and subtract 2. However, that fuel also requires fuel, and that fuel requires fuel, and so on. Any mass that would require negative fuel should instead be treated as if it requires zero fuel; the remaining mass, if any, is instead handled by wishing really hard, which has no mass and is outside the scope of this calculation.

So, for each module mass, calculate its fuel and add it to the total. Then, treat the fuel amount you just calculated as the input mass and repeat the process, continuing until a fuel requirement is zero or negative. For example:

A module of mass 14 requires 2 fuel. This fuel requires no further fuel (2 divided by 3 and rounded down is 0, which would call for a negative fuel), so the total fuel required is still just 2.
At first, a module of mass 1969 requires 654 fuel. Then, this fuel requires 216 more fuel (654 / 3 - 2). 216 then requires 70 more fuel, which requires 21 fuel, which requires 5 fuel, which requires no further fuel. So, the total fuel required for a module of mass 1969 is 654 + 216 + 70 + 21 + 5 = 966.
The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.
What is the sum of the fuel requirements for all of the modules on your spacecraft when also taking into account the mass of the added fuel? (Calculate the fuel requirements for each module separately, then add them all up at the end.)

Although it hasn't changed, you can still get your puzzle input.
*/
// input data
const data = [ 110321,61817,107271,126609,84016,119187,53199,117553,83163,69434,62734,76774,75016,126859,114626,70782,102903,105871,108500,149367,99266,131731,86778,110561,116521,138216,55347,135516,126801,124902,103083,130858,54885,126837,71103,143975,135207,77264,149331,85252,78910,84007,123953,87355,113433,57750,78394,106081,110942,118180,71745,60080,56637,105491,111329,71799,59962,60597,75241,102506,75341,129539,71011,127185,51245,144401,78592,116835,52029,134905,80104,146304,113780,108124,131268,124765,78847,76897,56445,116487,62068,125176,122259,134261,101127,127089,55793,113113,132835,118901,59574,113399,73232,93720,144450,129604,101741,108759,55891,52939 ];

// calcualtes mass
function calculateFuelForMass(mass: number): number {
	return math.floor(mass / 3) - 2;
}

// calculates fuel required for a specific module
function calculateFuelForModule(mass: number): number {
	const fuelCost = calculateFuelForMass(mass);
	if (fuelCost < 0) {
		return 0
	}

	return fuelCost + calculateFuelForModule(fuelCost);
}

// calculate fuel required for modules (input data)
let totalFuelCost = 0;
for (const module of data) {
	totalFuelCost += calculateFuelForModule(module);
}

// output total fuel cost
warn(totalFuelCost); // 4948732

export {}