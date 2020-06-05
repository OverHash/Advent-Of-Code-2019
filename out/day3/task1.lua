-- Compiled with https://roblox-ts.github.io v0.3.1
-- June 5, 2020, 10:24 PM New Zealand Standard Time

local wire1 = { "R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51" };
local wire2 = { "U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7" };
local isOnSegment = function(p, q, r)
	if (q.X <= math.max(p.X, r.X)) and (q.X >= math.min(p.X, r.X)) and (q.Y <= math.max(p.Y, r.Y)) and (q.Y >= math.min(p.Y, r.Y)) then
		return true;
	else
		return false;
	end;
end;
local calculateOrientation = function(p, q, r)
	local val = (q.Y - p.Y) * (r.X - q.X) - (q.X - p.X) * (r.Y - q.Y);
	if val == 0 then
		return 0;
	end;
	if val > 0 then
		return 1;
	else
		return 2;
	end;
end;
local doesIntersect = function(p1, q1, p2, q2)
	local o1 = calculateOrientation(p1, q1, p2);
	local o2 = calculateOrientation(p1, q1, q2);
	local o3 = calculateOrientation(p2, q2, p1);
	local o4 = calculateOrientation(p2, q2, q1);
	if (o1 ~= o2) and (o3 ~= o4) then
		return true;
	end;
	if (o1 == 0) and (isOnSegment(p1, p2, q1)) then
		return true;
	end;
	return false;
end;
local calculateIntersectionPoint = function(p1, q1, p2, q2)
	local d = (p1.X - q1.X) * (p2.Y - q2.Y) - (p1.Y - q1.Y) * (p2.X - q2.X);
	local a = p1.X * q1.Y - p1.Y * q1.X;
	local b = p2.X * q2.Y - p2.Y * q2.X;
	local x = (a * (p2.X - q2.X) - (p1.X - q1.X) * b) / d;
	local y = (a * (p2.Y - q2.Y) - (p1.Y - q1.Y) * b) / d;
	return Vector2.new(x, y);
end;
local wire1Coords = {};
local wire2Coords = {};
local lastCoord = Vector2.new();
do
	local wire1i = 0;
	while wire1i < #wire1 do
		local wire = wire1[wire1i + 1];
		local dir = string.sub(wire, 1, 1);
		local val = tonumber(string.sub(wire, 2));
		if not (val ~= 0 and val == val and val) then
			error("Expected " .. tostring(val) .. " to be of type number, but it wasn't. Original str: " .. wire);
		end;
		local _2 = lastCoord;
		local _0;
		if dir == 'L' then
			_0 = -val;
		else
			if dir == 'R' then
				_0 = val;
			else
				_0 = 0;
			end;
		end;
		local _1;
		if dir == 'U' then
			_1 = val;
		else
			if dir == 'D' then
				_1 = -val;
			else
				_1 = 0;
			end;
		end;
		lastCoord = (_2 + (Vector2.new(_0, _1)));
		wire1Coords[#wire1Coords + 1] = Vector2.new(lastCoord.X, lastCoord.Y);
		wire1i = wire1i + 1;
	end;
end;
lastCoord = Vector2.new(0, 0);
do
	local wire2i = 0;
	while wire2i < #wire2 do
		local wire = wire2[wire2i + 1];
		local dir = string.sub(wire, 1, 1);
		local val = tonumber(string.sub(wire, 2));
		if not (val ~= 0 and val == val and val) then
			error("Expected " .. tostring(val) .. " to be of type number, but it wasn't. Original str: " .. wire);
		end;
		local _2 = lastCoord;
		local _0;
		if dir == 'L' then
			_0 = -val;
		else
			if dir == 'R' then
				_0 = val;
			else
				_0 = 0;
			end;
		end;
		local _1;
		if dir == 'U' then
			_1 = val;
		else
			if dir == 'D' then
				_1 = -val;
			else
				_1 = 0;
			end;
		end;
		lastCoord = (_2 + (Vector2.new(_0, _1)));
		wire2Coords[#wire2Coords + 1] = Vector2.new(lastCoord.X, lastCoord.Y);
		wire2i = wire2i + 1;
	end;
end;
local intersections = {};
do
	local i = 0;
	while i < #wire1Coords - 1 do
		do
			local k = 0;
			while k < #wire2Coords - 1 do
				local p1 = wire1Coords[i + 1];
				local p2 = wire2Coords[k + 1];
				local q1 = wire1Coords[i + 1 + 1];
				local q2 = wire2Coords[k + 1 + 1];
				if doesIntersect(p1, q1, p2, q2) then
					local intersection = calculateIntersectionPoint(p1, q1, p2, q2);
					intersections[#intersections + 1] = intersection;
				end;
				k = k + 1;
			end;
		end;
		i = i + 1;
	end;
end;
local closestIntersection = { math.huge, nil };
for _0 = 1, #intersections do
	local intersection = intersections[_0];
	local dist = math.abs(intersection.X) + math.abs(intersection.Y);
	if dist < closestIntersection[1] then
		closestIntersection = { dist, intersection };
	end;
end;
print(closestIntersection[1], closestIntersection[2]);
return nil;
