import { readLines } from "../../util/inputUtils";
import Map2D from "./engine/Map2D";
import Map2DImpl from "./engine/Map2DImpl";
import Position2D from "./engine/Position2D";

function main() {
    test("input_test.txt");
    test("input_test2.txt");
    test("input_test3.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const map = readMap(filename);
    const areas = findAllAreas(map);
    let result = 0;
    for (const area of areas) {
        let areaValue = calcAreaValue(area);
        let perimeterValue = calcSidesValue(area);
        result += areaValue * perimeterValue;
    }
    console.log(filename, "-> Result:", result);
}

function calcSidesValue(map: Map2D): number {   
    return calcTopAndBottomSidesValue(map) + calcLeftAndRightSidesValue(map);
}

function calcTopAndBottomSidesValue(map: Map2D): number {
    let result = 0;
    for (let y = 0; y < map.height; y++) {
        let hasTopSlide = false;
        let hasBottomSlide = false;
        for (let x = 0; x < map.width; x++) {
            const obj = map.getObjAt({ x, y });
            if (obj) {
                if (map.isPositionOccupied({ x, y: y - 1 })) {
                    if (hasTopSlide) result++;
                    hasTopSlide = false;
                } else {
                    hasTopSlide = true;
                }
                if (map.isPositionOccupied({ x, y: y + 1 })) {
                    if (hasBottomSlide) result++;
                    hasBottomSlide = false;
                } else {
                    hasBottomSlide = true;
                }
            } else {
                if (hasTopSlide) result++;
                if (hasBottomSlide) result++;
                hasTopSlide = false;
                hasBottomSlide = false;
            }
        }
        if (hasTopSlide) result++;
        if (hasBottomSlide) result++;
    }
    return result;
}

function calcLeftAndRightSidesValue(map: Map2D): number {
    let result = 0;
    for (let x = 0; x < map.width; x++) {
        let hasLeftSlide = false;
        let hasRightSlide = false;
        for (let y = 0; y < map.height; y++) {
            const obj = map.getObjAt({ x, y });
            if (obj) {
                if (map.isPositionOccupied({ x: x - 1, y })) {
                    if (hasLeftSlide) result++;
                    hasLeftSlide = false;
                } else {
                    hasLeftSlide = true;
                }
                if (map.isPositionOccupied({ x: x + 1, y })) {
                    if (hasRightSlide) result++;
                    hasRightSlide = false;
                } else {
                    hasRightSlide = true;
                }
            } else {
                if (hasLeftSlide) result++;
                if (hasRightSlide) result++;
                hasLeftSlide = false;
                hasRightSlide = false;
            }
        }
        if (hasLeftSlide) result++;
        if (hasRightSlide) result++;
    }
    return result;
}

function calcAreaValue(map: Map2D): number {
    return map.listObjs().length;
}

function listValidNeighborsPositions(map: Map2D, position: Position2D): Position2D[] {
    return listNeighborsPositions(position).filter(p => map.isValidPosition(p));
}

function listNeighborsPositions(position: Position2D): Position2D[] {
    return [
        { x: position.x - 1, y: position.y },
        { x: position.x + 1, y: position.y },
        { x: position.x, y: position.y - 1 },
        { x: position.x, y: position.y + 1 }
    ];
}

function findAllAreas(map: Map2D): Map2D[] {
    const areas: Map2D[] = [];
    for (const obj of map.listObjs()) {
        if (!areas.some(area => area.isPositionOccupied(obj.position))) {
            areas.push(findAreaByPosition(map, obj.position));
        }
    }
    return areas;
}

function findAreaByPosition(map: Map2D, position: Position2D): Map2D {
    const area = new Map2DImpl({ width: map.width, height: map.height });
    const stack: Position2D[] = [position];
    const type = map.getObjAt(position)!.type;
    while (stack.length > 0) {
        const currentPosition = stack.pop();
        if (currentPosition === undefined) {
            break;
        }
        if (area.isPositionOccupied(currentPosition)) {
            continue;
        }
        area.addObj(map.getObjAt(currentPosition)!.type, currentPosition);
        for (const neighborPosition of listValidNeighborsPositions(map, currentPosition)) {
            if (type === map.getObjAt(neighborPosition)?.type) {
                stack.push(neighborPosition);
            }
        }
    }
    return area;
}

function readMap(filename: string): Map2D {
    const lines = readLines(filename, __dirname);
    const width = lines[0].length;
    const height = lines.length;
    const map = new Map2DImpl({ width, height });
    for (let y = 0; y < height; y++) {
        const line = lines[y];
        for (let x = 0; x < width; x++) {
            const type = line[x];
            map.addObj(type, { x, y });
        }
    }
    return map;
}

main();