-- Compiled with roblox-ts v0.4.0
--[[
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
]]
-- input data
local data = { 110321, 61817, 107271, 126609, 84016, 119187, 53199, 117553, 83163, 69434, 62734, 76774, 75016, 126859, 114626, 70782, 102903, 105871, 108500, 149367, 99266, 131731, 86778, 110561, 116521, 138216, 55347, 135516, 126801, 124902, 103083, 130858, 54885, 126837, 71103, 143975, 135207, 77264, 149331, 85252, 78910, 84007, 123953, 87355, 113433, 57750, 78394, 106081, 110942, 118180, 71745, 60080, 56637, 105491, 111329, 71799, 59962, 60597, 75241, 102506, 75341, 129539, 71011, 127185, 51245, 144401, 78592, 116835, 52029, 134905, 80104, 146304, 113780, 108124, 131268, 124765, 78847, 76897, 56445, 116487, 62068, 125176, 122259, 134261, 101127, 127089, 55793, 113113, 132835, 118901, 59574, 113399, 73232, 93720, 144450, 129604, 101741, 108759, 55891, 52939 }
-- total fuel required
local totalFuelRequired = 0
local function calculate(n)
	return math.floor(n / 3) - 2
end
-- calculate total fuel required for all modules
for _, n in ipairs(data) do
	totalFuelRequired += calculate(n)
end
print(totalFuelRequired)
return nil
