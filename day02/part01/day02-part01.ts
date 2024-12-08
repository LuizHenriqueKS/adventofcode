import { readMatrixFileAsNumber } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const matrix = readMatrixFileAsNumber(filename, __dirname, " ");
    let safes = 0;
    for (const row of matrix) {
        safes += isSafe(row) ? 1 : 0;
    }
    console.log(filename, "->", safes);
}

function isSafe(row: number[]) {
    let oldN = 0;
    let first = true;
    let isIncreasing = row[0] < row[1];
    let minDiff = isIncreasing ? 1 : -3;
    let maxDiff = isIncreasing ? 3 : -1;
    for (const n of row) {
        if (first) {
            first = false;
        } else {
            let diff = n - oldN;
            if (!(minDiff <= diff && maxDiff >= diff)) {
                return false;
            }
        }
        oldN = n;
    }
    return true;
}

main();


