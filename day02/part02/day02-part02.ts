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
        safes += (isSafeByRow(row, true) || isSafeByRow(row, false)) ? 1 : 0;
    }
    console.log(filename, "->", safes);
}

function isSafeByRow(row: number[], isIncreasing: boolean) {
    const safes = listSafesByRow(row, isIncreasing);
    const numberOfUnsafes = safes.filter(safe => !safe).length;
    if (numberOfUnsafes > 0) {
        for (let i = 0; i < safes.length; i++) {
            if (!safes[i]) {
                return isSafeByRowSkipLevel(row, i, isIncreasing) ||
                isSafeByRowSkipLevel(row, i + 1, isIncreasing);
            }
        }
    }
    return numberOfUnsafes == 0;
}

function listSafesByRow(row: number[], isIncreasing: boolean): boolean[] {
    let oldN = 0;
    let result : boolean[] = [];
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


function isSafeByRowSkipLevel(row: number[], i: number, isIncreasing: boolean) {
    const newRow = row.filter((_, index) => index !== i);
    return listSafesByRow(newRow, isIncreasing).filter(safe => !safe).length === 0;
}

