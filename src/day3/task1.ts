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

let wire1Coords: Array<Vector2> = [];
let wire2Coords: Array<Vector2> = [];

let lastCoord = new Vector2();
for (let wire1i = 0; wire1i < wire1.size(); wire1i++) {
	const wire = wire1[wire1i];
	
	const dir = wire.sub(0, 0);
	const val = tonumber(wire.sub(1));
	if (!val) throw `Expected ${val} to be of type number, but it wasn't. Original str: ${wire}`;

	lastCoord = lastCoord.add(new Vector2(dir === 'L' ? -val : dir === 'R' ? val : 0, dir === 'U' ? val : dir === 'D' ? -val : 0));

	wire1Coords.push(new Vector2(lastCoord.X, lastCoord.Y))
}
// reset coords back to centre of grid
lastCoord = new Vector2(0, 0);
for (let wire2i = 0; wire2i < wire2.size(); wire2i++) {
	const wire = wire2[wire2i];

	const dir = wire.sub(0, 0);
	const val = tonumber(wire.sub(1));
	if (!val) throw `Expected ${val} to be of type number, but it wasn't. Original str: ${wire}`;

	lastCoord = lastCoord.add(new Vector2(dir === 'L' ? -val : dir === 'R' ? val : 0, dir === 'U' ? val : dir === 'D' ? -val : 0));

	wire2Coords.push(new Vector2(lastCoord.X, lastCoord.Y))
}


let intersections: Array<Vector2> = [];
// CALCULATE LINE SEGMENTS THAT INTERSECT
for (let i = 0; i < wire1Coords.size() - 1; i++) {
	for (let k = 0; k < wire2Coords.size() - 1; k++) {
		const p1 = wire1Coords[i];
		const p2 = wire2Coords[k];

		// calculate coords
		const q1 = wire1Coords[i + 1];
		const q2 = wire2Coords[k + 1];

		if (doesIntersect(p1, q1, p2, q2)) {
			const intersection = calculateIntersectionPoint(p1, q1, p2, q2);
			intersections.push(intersection);
		}
	}
}

let closestIntersection: [number, Vector2 | void] = [math.huge, undefined];
for (const intersection of intersections) {
	const dist = math.abs(intersection.X) + math.abs(intersection.Y);

	if (dist < closestIntersection[0]) {
		closestIntersection = [dist, intersection];
	}
}

print(closestIntersection[0], closestIntersection[1]);

export { }