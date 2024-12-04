import fs from 'fs';
import path from 'path';

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const fullPath = path.join(__dirname, filename);
    const fileContent = fs.readFileSync(fullPath, 'utf-8').toString();
    const matrix = fileContent
        .split('\n')
        .map(it => lineToNumbers(it));
    const firstList = getList(matrix, 0);
    const secondList = getList(matrix, 1);
    firstList.sort();
    secondList.sort();
    const result = calcTotalDistance(firstList, secondList)
    console.log(filename, "->", result);
}

function getList(matrix: number[][], col: number): number[] {
    return matrix.map(it => it[col]);
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

function lineToNumbers(it: string): any {
    const regex = /(-?\d*) *(-?\d*)/gm
    let m;
    if ((m = regex.exec(it)) !== null) {
        return [parseInt(m[1]), parseInt(m[2])];
    }
}

main();

