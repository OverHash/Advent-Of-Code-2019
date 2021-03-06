-- Compiled with roblox-ts v0.4.0
--[[
	*
	--- Day 3: Crossed Wires ---
	The gravity assist was successful, and you're well on your way to the Venus refuelling station. During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.
	Opening the front panel reveals a jumble of wires. Specifically, two wires are connected to a central port and extend outward on a grid. You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).
	The wires twist and turn, but the two wires occasionally cross paths. To fix the circuit, you need to find the intersection point closest to the central port. Because the wires are on a grid, use the Manhattan distance for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.
	For example, if the first wire's path is R8,U5,L5,D3, then starting from the central port (o), it goes right 8, up 5, left 5, and finally down 3:
	...........
	...........
	...........
	....+----+.
	....|....|.
	....|....|.
	....|....|.
	.........|.
	.o-------+.
	...........
	Then, if the second wire's path is U7,R6,D4,L4, it goes up 7, right 6, down 4, and left 4:
	...........
	.+-----+...
	.|.....|...
	.|..+--X-+.
	.|..|..|.|.
	.|.-X--+.|.
	.|..|....|.
	.|.......|.
	.o-------+.
	...........
	These wires cross at two locations (marked X), but the lower-left one is closer to the central port: its distance is 3 + 3 = 6.
	Here are a few more examples:
	R75,D30,R83,U83,L12,D49,R71,U7,L72
	U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
	R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
	U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135
	What is the Manhattan distance from the central port to the closest intersection?
]]
local wire1 = { "R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51" }
local wire2 = { "U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7" }
--[[
	*
	* Given three colinear points (p, q, r), this function returns if point q lies on the line segment pr
]]
local isOnSegment = function(p, q, r)
	if q.X <= math.max(p.X, r.X) and q.X >= math.min(p.X, r.X) and q.Y <= math.max(p.Y, r.Y) and q.Y >= math.min(p.Y, r.Y) then
		-- it's on!
		return true
	else
		return false
	end
end
--[[
	*
	* Calculates thte "orientation" between a triplet of vectors (p, q, r)
	* @returns
	* 0 = colinear
	* 1 = clockwise
	* 2 = counter-clockwise
]]
local calculateOrientation = function(p, q, r)
	local val = (q.Y - p.Y) * (r.X - q.X) - (q.X - p.X) * (r.Y - q.Y)
	if val == 0 then
		-- it's colinear!
		return 0
	end
	if val > 0 then
		-- clockwise!
		return 1
	else
		return 2
	end
end
local doesIntersect = function(p1, q1, p2, q2)
	-- get orientations
	local o1 = calculateOrientation(p1, q1, p2)
	local o2 = calculateOrientation(p1, q1, q2)
	local o3 = calculateOrientation(p2, q2, p1)
	local o4 = calculateOrientation(p2, q2, q1)
	-- calculate if the two orientations are not equal.
	-- This is for general cases, we handle special cases regarding colinear points later.
	if o1 ~= o2 and o3 ~= o4 then
		return true
	end
	-- handle special cases
	-- p1, q1 and p2 are colinear and p2 lies on segment p1q1
	if o1 == 0 and isOnSegment(p1, p2, q1) then
		return true
	end
	-- it doesn't intersect, as it doesn't match any of the special cases.
	return false
end
local calculateIntersectionPoint = function(p1, q1, p2, q2)
	local d = (p1.X - q1.X) * (p2.Y - q2.Y) - (p1.Y - q1.Y) * (p2.X - q2.X)
	local a = p1.X * q1.Y - p1.Y * q1.X
	local b = p2.X * q2.Y - p2.Y * q2.X
	local x = (a * (p2.X - q2.X) - (p1.X - q1.X) * b) / d
	local y = (a * (p2.Y - q2.Y) - (p1.Y - q1.Y) * b) / d
	return Vector2.new(x, y)
end
local wire1Coords = {}
local wire2Coords = {}
local lastCoord = Vector2.new()
do
	local wire1i = 0
	while wire1i < #wire1 do
		local wire = wire1[wire1i + 1]
		local dir = string.sub(wire, 1, 1)
		local val = tonumber(string.sub(wire, 2))
		if not (val ~= 0 and val == val and val) then
			error("Expected " .. tostring(val) .. " to be of type number, but it wasn't. Original str: " .. wire)
		end
		lastCoord = lastCoord + Vector2.new(((dir == "L") and -val or ((dir == "R") and val or 0)), ((dir == "U") and val or ((dir == "D") and -val or 0)))
		-- ▼ Array.push ▼
		wire1Coords[#wire1Coords + 1] = Vector2.new(lastCoord.X, lastCoord.Y)
		-- ▲ Array.push ▲
		wire1i += 1
	end
end
-- reset coords back to centre of grid
lastCoord = Vector2.new(0, 0)
do
	local wire2i = 0
	while wire2i < #wire2 do
		local wire = wire2[wire2i + 1]
		local dir = string.sub(wire, 1, 1)
		local val = tonumber(string.sub(wire, 2))
		if not (val ~= 0 and val == val and val) then
			error("Expected " .. tostring(val) .. " to be of type number, but it wasn't. Original str: " .. wire)
		end
		lastCoord = lastCoord + Vector2.new(((dir == "L") and -val or ((dir == "R") and val or 0)), ((dir == "U") and val or ((dir == "D") and -val or 0)))
		-- ▼ Array.push ▼
		wire2Coords[#wire2Coords + 1] = Vector2.new(lastCoord.X, lastCoord.Y)
		-- ▲ Array.push ▲
		wire2i += 1
	end
end
local intersections = {}
-- CALCULATE LINE SEGMENTS THAT INTERSECT
do
	local i = 0
	while i < #wire1Coords - 1 do
		do
			local k = 0
			while k < #wire2Coords - 1 do
				local p1 = wire1Coords[i + 1]
				local p2 = wire2Coords[k + 1]
				-- calculate coords
				local q1 = wire1Coords[i + 1 + 1]
				local q2 = wire2Coords[k + 1 + 1]
				if doesIntersect(p1, q1, p2, q2) then
					local intersection = calculateIntersectionPoint(p1, q1, p2, q2)
					-- ▼ Array.push ▼
					intersections[#intersections + 1] = intersection
					-- ▲ Array.push ▲
				end
				k += 1
			end
		end
		i += 1
	end
end
local closestIntersection = { math.huge, nil }
for _, intersection in ipairs(intersections) do
	local dist = math.abs(intersection.X) + math.abs(intersection.Y)
	if dist < closestIntersection[1] then
		closestIntersection = { dist, intersection }
	end
end
print(closestIntersection[1], closestIntersection[2])
return nil
