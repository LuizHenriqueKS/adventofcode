
import { readLines } from "../../util/inputUtils";
import Map2D from "./engine/Map2D";
import Map2DImpl from "./engine/Map2DImpl";
import Robot from "./engine/Robot";

function main() {
    //test("input_test2.txt");
    //test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string): void {
    const map = readMap(filename);
    let seconds;
    for (seconds = 1; ; seconds++) {
        map.listObjs().forEach(obj => {
            if (obj.type === "robot") {
                const robot = obj as Robot;
                const newPosition = { x: robot.position.x + robot.velocity.x, y: robot.position.y + robot.velocity.y };
                map.moveObj(robot, newPosition);
            }
        });
        if (isPictureChristmasTree(map)) {
            break;
        }
        if (seconds % 1000 === 0) {
            console.log('Seconds:', seconds);
        }
        //logMap(map);
    }
    logMap(map);
    console.log(filename, "- Seconds: " + seconds);
}

function isPictureChristmasTree(map: Map2D): boolean {
    for (let obj of map.listObjs()) {
        let counter = 0;
        for (let x = obj.position.x; x < map.width; x++) {
            if (map.isPositionOccupied({ x, y: obj.position.y })) {
                counter++;
                if (counter > 10) {
                    return true;
                }
            } else {
                break;
            }
        }
    }
    return false;
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

