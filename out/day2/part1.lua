-- Compiled with https://roblox-ts.github.io v0.2.15-commit-ba0a895.0
-- December 26, 2019, 10:14 AM New Zealand Daylight Time

local data = { 1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 9, 1, 19, 1, 5, 19, 23, 2, 9, 23, 27, 1, 27, 5, 31, 2, 31, 13, 35, 1, 35, 9, 39, 1, 39, 10, 43, 2, 43, 9, 47, 1, 47, 5, 51, 2, 13, 51, 55, 1, 9, 55, 59, 1, 5, 59, 63, 2, 6, 63, 67, 1, 5, 67, 71, 1, 6, 71, 75, 2, 9, 75, 79, 1, 79, 13, 83, 1, 83, 13, 87, 1, 87, 5, 91, 1, 6, 91, 95, 2, 95, 13, 99, 2, 13, 99, 103, 1, 5, 103, 107, 1, 107, 10, 111, 1, 111, 13, 115, 1, 10, 115, 119, 1, 9, 119, 123, 2, 6, 123, 127, 1, 5, 127, 131, 2, 6, 131, 135, 1, 135, 2, 139, 1, 139, 9, 0, 99, 2, 14, 0, 0 };
data[2] = 12;
data[3] = 2;
local function solveOpcode(opcode, digit1, digit2)
	if opcode == 1 then
		return { true, digit1 + digit2 };
	elseif opcode == 2 then
		return { true, digit1 * digit2 };
	else
		return { false };
	end;
end;
do
	local i = 0;
	while i < #data do
		local opcode = data[i + 1];
		local digit1 = data[data[i + 1 + 1] + 1];
		local digit2 = data[data[i + 2 + 1] + 1];
		local savePosition = data[i + 3 + 1];
		print(opcode, digit1, digit2, savePosition);
		local _0 = solveOpcode(opcode, digit1, digit2);
		local couldSave = _0[1];
		local result = _0[2];
		print(couldSave, result);
		if not (couldSave) then
			break;
		elseif couldSave and (result ~= 0 and result == result and result) then
			data[savePosition + 1] = result;
		end;
		i = i + (4);
	end;
end;
print(unpack(data));
return nil;
