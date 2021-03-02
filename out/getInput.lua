-- Compiled with roblox-ts v1.0.0-beta.15
local function getInput(script)
	local parent = script.Parent
	if not parent then
		error("Expected " .. script:GetFullName() .. " to have a parent.")
	end
	local input = parent:FindFirstChild("input")
	if not (input and input:IsA("ModuleScript")) then
		error("Expected " .. parent:GetFullName() .. ".input to exist and be a ModuleScript")
	end
	return (require(input)).default
end
return {
	getInput = getInput,
}
