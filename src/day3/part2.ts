/**
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

Your puzzle answer was 721.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
It turns out that this circuit is very timing-sensitive; you actually need to minimize the signal delay.

To do this, calculate the number of steps each wire takes to reach each intersection; choose the intersection where the sum of both wires' steps is lowest. If a wire visits a position on the grid multiple times, use the steps value from the first time it visits that position when calculating the total value of a specific intersection.

The number of steps a wire takes is the total number of grid squares the wire has entered to get to that location, including the intersection being considered. Again consider the example from above:

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
In the above example, the intersection closest to the central port is reached after 8+5+5+2 = 20 steps by the first wire and 7+6+4+3 = 20 steps by the second wire for a total of 20+20 = 40 steps.

However, the top-right intersection is better: the first wire takes only 8+5+2 = 15 and the second wire takes only 7+6+2 = 15, a total of 15+15 = 30 steps.

Here are the best steps for the extra examples from above:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = 610 steps
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = 410 steps
What is the fewest combined steps the wires must take to reach an intersection?
*/
const wire1 = ["R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"]
const wire2 = ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]

/**
 * Given three colinear points (p, q, r), this function returns if point q lies on the line segment pr
 */
const isOnSegment = (p: Vector2, q: Vector2, r: Vector2): boolean => {
	if (q.X <= math.max(p.X, r.X) && q.X >= math.min(p.X, r.X) &&
		q.Y <= math.max(p.Y, r.Y) && q.Y >= math.min(p.Y, r.Y)) {

		// it's on!
		return true
	} else {
		return false
	}
}

/**
 * Calculates thte "orientation" between a triplet of vectors (p, q, r)
 * @returns
 * 0 = colinear
 * 1 = clockwise
 * 2 = counter-clockwise
 */
const calculateOrientation = (p: Vector2, q: Vector2, r: Vector2): 0 | 1 | 2 => {
	const val = (q.Y - p.Y) * (r.X - q.X)
		- (q.X - p.X) * (r.Y - q.Y)

	if (val === 0) {
		// it's colinear!
		return 0;
	}

	if (val > 0) {
		// clockwise!
		return 1;
	} else {
		return 2;
	}
}

const doesIntersect = (p1: Vector2, q1: Vector2, p2: Vector2, q2: Vector2): boolean => {
	// get orientations
	const o1 = calculateOrientation(p1, q1, p2);
	const o2 = calculateOrientation(p1, q1, q2);
	const o3 = calculateOrientation(p2, q2, p1);
	const o4 = calculateOrientation(p2, q2, q1);

	// calculate if the two orientations are not equal.
	// This is for general cases, we handle special cases regarding colinear points later.
	if (o1 !== o2 && o3 !== o4) {
		return true;
	}

	// handle special cases
	// p1, q1 and p2 are colinear and p2 lies on segment p1q1
	if (o1 === 0 && isOnSegment(p1, p2, q1)) return true;

	// it doesn't intersect, as it doesn't match any of the special cases.
	return false;
}

const calculateIntersectionPoint = (p1: Vector2, q1: Vector2, p2: Vector2, q2: Vector2): Vector2 => {
	const d = (p1.X - q1.X) * (p2.Y - q2.Y) - (p1.Y - q1.Y) * (p2.X - q2.X);
	const a = p1.X * q1.Y - p1.Y * q1.X;
	const b = p2.X * q2.Y - p2.Y * q2.X;
	const x = (a * (p2.X - q2.X) - (p1.X - q1.X) * b) / d
	const y = (a * (p2.Y - q2.Y) - (p1.Y - q1.Y) * b) / d

	return new Vector2(x, y);
}

/**
 * Takes a coordinate point and a string input and parses it into a Vector2 and adds it to the last coordinate.
 * @param lastCoordinate The coordinate to start from
 * @param str The string to parse into a Vector2 and add to the latest coordinate
 * @returns An array containing the parsed coordinate and the new coordinate position
 */
function calculateCoordinate(lastCoordinate: Vector2, str: string) {
	const dir = str.sub(0, 0);
	const val = tonumber(str.sub(1));
	if (!val) throw `Expected ${val} to be of type number, but it wasn't. Original str: ${str}`;

	let parsedCoordinate = new Vector2(dir === 'L' ? -val : dir === 'R' ? val : 0, dir === 'U' ? val : dir === 'D' ? -val : 0)
	
	lastCoordinate = lastCoordinate.add(parsedCoordinate);

	return [parsedCoordinate, lastCoordinate];
}

// we give the final coordinate and a distance to get to that point
let wire1Coords: Array<[Vector2, number]> = [];
let wire2Coords: Array<[Vector2, number]> = [];

let lastCoord = new Vector2();
let stepDistance = 0;
for (let wire1i = 0; wire1i < wire1.size(); wire1i++) {
	const wire = wire1[wire1i];

	const [parsedCoordinate, newCoordinate] = calculateCoordinate(lastCoord, wire);
	lastCoord = newCoordinate;

	stepDistance += math.abs(parsedCoordinate.X) + math.abs(parsedCoordinate.Y);

	wire1Coords.push([new Vector2(lastCoord.X, lastCoord.Y), stepDistance]);
}
// reset coords back to centre of grid
lastCoord = new Vector2(0, 0);
stepDistance = 0;
for (let wire2i = 0; wire2i < wire2.size(); wire2i++) {
	const wire = wire2[wire2i];

	const [parsedCoordinate, newCoordinate] = calculateCoordinate(lastCoord, wire);
	lastCoord = newCoordinate;

	stepDistance += math.abs(parsedCoordinate.X) + math.abs(parsedCoordinate.Y);

	wire2Coords.push([new Vector2(lastCoord.X, lastCoord.Y), stepDistance]);
}


let intersections: Array<[Vector2, number, number]> = [];
// CALCULATE LINE SEGMENTS THAT INTERSECT
for (let i = 0; i < wire1Coords.size() - 1; i++) {
	for (let k = 0; k < wire2Coords.size() - 1; k++) {
		const p1 = wire1Coords[i];
		const p2 = wire2Coords[k];

		// calculate coords
		const q1 = wire1Coords[i + 1];
		const q2 = wire2Coords[k + 1];

		if (doesIntersect(p1[0], q1[0], p2[0], q2[0])) {
			const intersection = calculateIntersectionPoint(p1[0], q1[0], p2[0], q2[0]);
			const distFromWire1 = math.abs(intersection.X - p1[0].X) + math.abs(intersection.Y - p1[0].Y);
			const distFromWire2 = math.abs(intersection.X - p2[0].X) + math.abs(intersection.Y - p2[0].Y);

			intersections.push([intersection, distFromWire1+p1[1], distFromWire2+p2[1]]);
		}
	}
}

let closestIntersection: [number, Vector2 | void] = [math.huge, undefined];
for (const intersection of intersections) {
	const dist = intersection[1] + intersection[2];

	if (dist < closestIntersection[0]) {
		closestIntersection = [dist, intersection[0]];
	}
}

print(closestIntersection[0], closestIntersection[1]);

export { }