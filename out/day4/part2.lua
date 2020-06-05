-- Compiled with https://roblox-ts.github.io v0.3.1
-- June 6, 2020, 11:53 AM New Zealand Standard Time

local min = 109165;
local max = 576723;
local function meetsCriteria(password)
	local strPass = tostring(password);
	if #strPass ~= 6 then
		return false;
	end;
	if not ((password >= min) and (max >= password)) then
		return false;
	end;
	do
		local k = 0;
		while k < #strPass - 1 do
			local _0 = k;
			if _0 >= 0 then _0 = _0 + 1; end;
			local currentStr = string.sub(strPass, _0, _0);
			local _1 = k + 1;
			if _1 >= 0 then _1 = _1 + 1; end;
			local _2 = k + 1;
			if _2 >= 0 then _2 = _2 + 1; end;
			local nextStr = string.sub(strPass, _1, _2);
			if tonumber(currentStr) > tonumber(nextStr) then
				return false;
			end;
			k = k + 1;
		end;
	end;
	local sections = {};
	for char in string.gmatch(strPass, "[%z\1-\127\194-\244][\128-\191]*") do
		local sectionData = sections[#sections - 1 + 1];
		if sectionData and (sectionData[1] == char) then
			sectionData[2] = sectionData[2] + 1;
		else
			sections[#sections + 1] = ({ char, 1 });
		end;
	end;
	local isAdjacentDigit = false;
	for _0 = 1, #sections do
		local section = sections[_0];
		if section[2] == 2 then
			isAdjacentDigit = true;
		end;
	end;
	if not (isAdjacentDigit) then
		return false;
	end;
	return true;
end;
local possibleCombinations = 0;
for i = min, max do
	if meetsCriteria(i) then
		possibleCombinations = possibleCombinations + 1;
	end;
end;
print(possibleCombinations);
return nil;
