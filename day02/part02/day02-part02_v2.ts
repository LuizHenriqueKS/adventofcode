import { readMatrixFileAsNumber } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_test2.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const matrix = readMatrixFileAsNumber(filename, __dirname, " ");
    let safes = 0;
    for (const row of matrix) {
        if (isSafeByRow(row) || arraysWithOneLevelLess(row).find(it => isSafeByRow(it))) {
            safes += 1;
        }
    }
    console.log(filename, "->", safes);
}

function arraysWithOneLevelLess(row: number[]): number[][] {
    let result = [];
    for (let i = 0; i < row.length; i++) {
        result.push(row.filter((_, index) => index !== i));
    }
    return result;
}

function isSafeByRow(row: number[]) {
    const safes = listSafesByRow(row);
    const numberOfUnsafes = safes.filter(safe => !safe).length;
    return numberOfUnsafes == 0;
}

function listSafesByRow(row: number[]): boolean[] {
    let oldN = 0;
    let result : boolean[] = [];
    const isIncreasing = row[0] < row[1];
    for (const n of row) {
        if (oldN !== 0) {
            let diff = n - oldN;
            result.push(isSafeByDiff(diff, isIncreasing));
        }
        oldN = n;    
    }
    return result;
}

function isSafeByDiff(diff: number, isIncreasing: boolean) {
    let minDiff = isIncreasing ? 1 : -3;
    let maxDiff = isIncreasing ? 3 : -1;
    return minDiff <= diff && maxDiff >= diff;
}

main();

