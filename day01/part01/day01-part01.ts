import path from 'path';
import fs from 'fs';
import { getCol, readMatrixFileAsNumber } from '../../util/inputUtils';

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const matrix = readMatrixFileAsNumber(filename, __dirname);
    const firstList = getCol(matrix, 0);
    const secondList = getCol(matrix, 1);
    firstList.sort();
    secondList.sort();
    const result = calcTotalDistance(firstList, secondList)
    console.log(filename, "->", result);
}

function calcTotalDistance(firstList: number[], secondList: number[]) {
    let totalDistance = 0;
    for (let i = 0; i < firstList.length; i++) {
        const firstValue = firstList[i];
        const secondValue = secondList[i];
        let distance = Math.abs(firstValue - secondValue);
        totalDistance += distance;
    }
    return totalDistance;
}

main();

