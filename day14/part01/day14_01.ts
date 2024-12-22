
import { readLines } from "../../util/inputUtils";
import Map2D from "./engine/Map2D";
import Map2DImpl from "./engine/Map2DImpl";
import Robot from "./engine/Robot";

function main() {
    test("input_test.txt");
}

function test(file: string): Map2D {
    const lines = readLines(file, __dirname);
    const [width, height] = lines[0].split(",").map(it => it.trim()).map(Number);
    const map: Map2D = new Map2DImpl({ width, height });
    for (let i = 1; i < height; i++) {
        const line = lines[i];
        const robot = extractRobot(line);
        map.addObj(robot);
    }
    return map;
}

function extractRobot(line: string): Robot {
    const regex = /p=(\d+),(\d+), v=(\d+),(\d+)/;
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

