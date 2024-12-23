
import { readLines } from "../../util/inputUtils";
import Map2D from "./engine/Map2D";
import Map2DImpl from "./engine/Map2DImpl";
import Robot from "./engine/Robot";

function main() {
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string): void {
    const seconds = 100;
    const map = readMap(filename);
    //logMap(map);
    for (let i = 0; i < seconds; i++) {
        map.listObjs().forEach(obj => {
            if (obj.type === "robot") {
                const robot = obj as Robot;
                const newPosition = { x: robot.position.x + robot.velocity.x, y: robot.position.y + robot.velocity.y };
                map.moveObj(robot, newPosition);
            }
        });
        // logMap(map);
    }
    // logMap(map);
    const quadrants = getQuadrants(map);
    const result = quadrants.map(it => it.listObjs().length).reduce((a, b) => a * b, 1);
    console.log(filename, "- Result: " + result);
}

function logMap(map: Map2D): void {
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const objs = map.findObjsAt({ x, y });
            if (objs.length === 0) {
                process.stdout.write(".");
            } else {
                process.stdout.write(objs.length+"");
            }
        }
        process.stdout.write("\n");
    }
    process.stdout.write("\n");
}

function getQuadrants(map: Map2D): Map2D[] {
    const quadrants: Map2D[] = [];
    const xCenter = Math.floor(map.width / 2);
    const yCenter = Math.floor(map.height / 2);
    for (let i = 0; i < 4; i++) {
        quadrants.push(new Map2DImpl({ width: map.width, height: map.height }));
    }
    map.listObjs().forEach(obj => {
        const x = obj.position.x;
        const y = obj.position.y;
        if (x === xCenter || y === yCenter) {
            return;
        }
        if (x < xCenter && y < yCenter) {
            quadrants[0].addObj(obj);
        } else if (x >= xCenter && y < yCenter) {
            quadrants[1].addObj(obj);
        } else if (x < xCenter && y >= yCenter) {
            quadrants[2].addObj(obj);
        } else if (x >= xCenter && y >= yCenter) {
            quadrants[3].addObj(obj);
        }
    });
    return quadrants;
}

function readMap(filename: string): Map2D {
    const lines = readLines(filename, __dirname);
    const [width, height] = lines[0].split(",").map(it => it.trim()).map(Number);
    const map: Map2D = new Map2DImpl({ width, height });
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const robot = extractRobot(line);
        map.addObj(robot);
    }
    return map;
}

function extractRobot(line: string): Robot {
    const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;
    const match = regex.exec(line);
    if (match === null) {
        throw new Error("Invalid line: " + line);
    }
    const x = Number(match[1]);
    const y = Number(match[2]);
    const vx = Number(match[3]);
    const vy = Number(match[4]);
    return { type: "robot", position: { x, y }, velocity: { x: vx, y: vy } };
}

main();

