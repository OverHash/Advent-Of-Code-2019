-- Compiled with roblox-ts v1.0.0-beta.15
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
--[[
	Your puzzle answer was 232.
	The first half of this puzzle is complete! It provides one gold star: *
	--- Part Two ---
	Now, given the same instructions, find the position of the first character that causes him to enter the basement (floor -1). The first character in the instructions has position 1, the second character has position 2, and so on.
	For example:
	) causes him to enter the basement at character position 1.
	()()) causes him to enter the basement at character position 5.
	What is the position of the character that causes Santa to first enter the basement?
]]
local input = TS.import(script, game:GetService("ServerScriptService"), "day1", "input").default
local floor = 0
local pos = 0
local _0 = string.gmatch(input, ".")
while true do
	local word = { _0() }
	if #word == 0 then
		break
	end
	pos += 1
	local char = word[1]
	if char == "(" then
		floor += 1
	else
		floor -= 1
	end
	if floor == -1 then
		break
	end
end
local output = pos
return {
	output = output,
}
