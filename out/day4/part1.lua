-- Compiled with roblox-ts v0.4.0
--[[
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
]]
local min = 109165
local max = 576723
local function meetsCriteria(password)
	local strPass = tostring(password)
	-- check 6 digit
	if #strPass ~= 6 then
		return false
	end
	-- check within range
	if not (password >= min and max >= password) then
		return false
	end
	-- check adjacent digits
	local hasAdjacent = false
	do
		local k = 0
		while k < #strPass - 1 do
			local currentStr = string.sub(strPass, k + 1, k + 1)
			local nextStr = string.sub(strPass, k + 1 + 1, k + 1 + 1)
			if currentStr == nextStr then
				hasAdjacent = true
			end
			k += 1
		end
	end
	if not hasAdjacent then
		return false
	end
	-- check digits never decrease
	do
		local k = 0
		while k < #strPass - 1 do
			local currentStr = string.sub(strPass, k + 1, k + 1)
			local nextStr = string.sub(strPass, k + 1 + 1, k + 1 + 1)
			if tonumber(currentStr) > tonumber(nextStr) then
				return false
			end
			k += 1
		end
	end
	return true
end
local possibleCombinations = 0
do
	local i = min
	while i <= max do
		if meetsCriteria(i) then
			possibleCombinations += 1
		end
		i += 1
	end
end
print(possibleCombinations)
return nil
