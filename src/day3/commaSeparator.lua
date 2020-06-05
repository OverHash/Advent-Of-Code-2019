local input = [[cat, dog, fish]]

local new = ""
for i in string.gmatch(input, "[^,]+") do
	if new ~= "" then
		-- add comma to separate from last
		new = new..', '
	end
	
	new = new..'"'..i..'"'
end

print(new)