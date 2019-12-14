-- Compiled with https://roblox-ts.github.io v0.2.14
-- December 14, 2019, 9:47 PM New Zealand Daylight Time

local calculateFuelForModule;
local data = { 110321, 61817, 107271, 126609, 84016, 119187, 53199, 117553, 83163, 69434, 62734, 76774, 75016, 126859, 114626, 70782, 102903, 105871, 108500, 149367, 99266, 131731, 86778, 110561, 116521, 138216, 55347, 135516, 126801, 124902, 103083, 130858, 54885, 126837, 71103, 143975, 135207, 77264, 149331, 85252, 78910, 84007, 123953, 87355, 113433, 57750, 78394, 106081, 110942, 118180, 71745, 60080, 56637, 105491, 111329, 71799, 59962, 60597, 75241, 102506, 75341, 129539, 71011, 127185, 51245, 144401, 78592, 116835, 52029, 134905, 80104, 146304, 113780, 108124, 131268, 124765, 78847, 76897, 56445, 116487, 62068, 125176, 122259, 134261, 101127, 127089, 55793, 113113, 132835, 118901, 59574, 113399, 73232, 93720, 144450, 129604, 101741, 108759, 55891, 52939 };
local function calculateFuelForMass(mass)
	return math.floor(mass / 3) - 2;
end;
function calculateFuelForModule(mass)
	local fuelCost = calculateFuelForMass(mass);
	if fuelCost < 0 then
		return 0;
	end;
	return fuelCost + calculateFuelForModule(fuelCost);
end;
local totalFuelCost = 0;
for _0 = 1, #data do
	local module = data[_0];
	totalFuelCost = totalFuelCost + (calculateFuelForModule(module));
end;
warn(totalFuelCost);
return nil;
