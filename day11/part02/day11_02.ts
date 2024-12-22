import { readTextFile } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const blinks = 75;
    let stones = readTextFile(filename, __dirname).trim().split(" ").map(Number);
    let stonesCounter: StonesCounter = new Map();
    stones.forEach(s => incCounter(stonesCounter, s, 1));
    for (let i = 0; i < blinks; i++) {
        stonesCounter = blink(stonesCounter);
    }
    const result = countStones(stonesCounter);
    console.log(filename, "-> result:", result);
}

function incCounter(stonesCounter: StonesCounter, stone: number, qtd: number): void {
    stonesCounter.set(stone, (stonesCounter.get(stone) || 0) + qtd);
}

function countStones(stonesCounter: StonesCounter): number {
    return Array.from(stonesCounter.values()).reduce((acc, val) => acc + val, 0);
}

function blink(stonesCounter: StonesCounter): StonesCounter {
    const newStonesCounter: StonesCounter = new Map();
    for (const [stone, qtd] of stonesCounter.entries()) {
        /*
            If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
        */
        if (stone === 0) {
            incCounter(newStonesCounter, 1, qtd);
        }
        /*
            If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
        */
        else if (`${stone}`.length % 2 === 0) {
            const str = stone.toString();
            const half = str.length / 2;
            const left = parseInt(str.substring(0, half));
            const right = parseInt(str.substring(half));
            incCounter(newStonesCounter, left, qtd);
            incCounter(newStonesCounter, right, qtd);
        }
        /*
            If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone. 
        */
        else {
            incCounter(newStonesCounter, stone * 2024, qtd);
        }
    }
    return newStonesCounter;
}

type StonesCounter = Map<number, number>;

main();