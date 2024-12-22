import { readTextFile } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const blinks = 25;
    let stones = readTextFile(filename, __dirname).trim().split(" ").map(Number);
    for (let i = 0; i < blinks; i++) {
        stones = blink(stones);
    }
    const result = stones.length;
    console.log(filename, "-> result:", result);
}

function blink(stones: number[]): number[] {
    const newStones = [];
    for (let i = 0; i < stones.length; i++) {      
        const stone = stones[i];
        /*
            If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
        */
        if (stone === 0) {
            newStones.push(1);
        } 
        /*
            If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
        */
        else if (`${stone}`.length % 2 === 0) {
            const str = stone.toString();
            const half = str.length / 2;
            const left = parseInt(str.substring(0, half));
            const right = parseInt(str.substring(half));
            newStones.push(left);
            newStones.push(right);
        }
        /*
            If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone. 
        */
        else {
            newStones.push(stone * 2024);
        }
    }
    return newStones;
}

main();