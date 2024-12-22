import { readLines } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const machines = readMachines(filename);
    let result = 0;
    for (const machine of machines) {
        const bestResult = calcBestResult(machine);
        if (bestResult.found) {
            result += calcTokens(bestResult.result);
        }
    }
    console.log(filename, "-> Result:", result);
}

function calcTokens(result: {a: number, b: number}): number {
    return result.a * 3 + result.b * 1;
}

function calcBestResult(machine: Machine): BestResult {
    const aTempPrize = machine.prize.x / machine.buttonA.x;
    const aTempB = - machine.buttonB.x / machine.buttonA.x;
    
    let b = (machine.prize.y - aTempPrize * machine.buttonA.y) / (machine.buttonB.y + aTempB * machine.buttonA.y);
    let a = aTempPrize + aTempB * b;

    b = Math.round(b);
    a = Math.round(a);

    const matchX = (a * machine.buttonA.x + b * machine.buttonB.x) === machine.prize.x;
    const matchY = (a * machine.buttonA.y + b * machine.buttonB.y) === machine.prize.y;

    return { found: matchX && matchY, result: {a, b} };
}

function readMachines(filename: string): Machine[] {
    const lines = readLines(filename, __dirname);
    const machines: Machine[] = [];
    let currentMachine = createMachine();
    let hasMachine = false;
    for (const line of lines) {
        if (line.startsWith("Prize:")) {
            const {x, y} = extractXAndY(line);
            currentMachine.prize = { x, y };
            hasMachine = true;
        } else if (line.startsWith("Button A:")) {
            const {x, y} = extractXAndY(line);
            currentMachine.buttonA = { x, y };
            hasMachine = true;
        } else if (line.startsWith("Button B:")) {
            const {x, y} = extractXAndY(line);
            currentMachine.buttonB = { x, y };
            hasMachine = true;
        } else {
            machines.push(currentMachine);
            currentMachine = createMachine();
            hasMachine = false;
        }
    }
    if (hasMachine) {
        machines.push(currentMachine);
    }
    return machines;
}

function createMachine(): Machine {
    return { prize: { x: 0, y: 0 }, buttonA: { x: 0, y: 0 }, buttonB: { x: 0, y: 0 } };
}

function extractXAndY(line: string): { x: number; y: number; } {
    const regex = /X(?:\+|=)(\d+), Y(?:\+|=)(\d+)/;
    const match = line.match(regex);
    if (!match) {
        throw new Error("Invalid line: " + line);
    }
    return { x: parseInt(match[1]), y: parseInt(match[2]) };
}

interface BestResult {
    found: boolean;
    result: {a: number, b: number}; 
}

interface Machine {
    prize: {x: number, y: number};
    buttonA: {x: number, y: number};
    buttonB: {x: number, y: number};
};

main();