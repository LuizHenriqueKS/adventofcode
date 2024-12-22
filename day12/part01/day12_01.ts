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
        let perimeterValue = calcPerimeterValue(area);
        result += areaValue * perimeterValue;
    }
    console.log(filename, "-> Result:", result);
}

function calcAreaValue(map: Map2D): number {
    return map.listObjs().length;
}

function calcPerimeterValue(map: Map2D): number {
    let result = 0;
    for (const obj of map.listObjs()) {
        result += 4 - listNeighborsPositions(obj.position).filter(p => map.getObjAt(p)?.type === obj.type).length;
    }
    return result;
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