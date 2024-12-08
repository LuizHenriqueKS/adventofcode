import { getCol, readMatrixFileAsNumber } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const matrix = readMatrixFileAsNumber(filename, __dirname);
    const firstList = getCol(matrix, 0);
    const secondList = getCol(matrix, 1);
    
    let result = 0;

    for (const item of firstList) {
        const count = countItemByList( item, secondList );
        result += item * count;
    }

    console.log(filename, "->", result);
}

function countItemByList(item: number, list: number[]): number {
    let count = 0;
    for (const listItem of list) {
        if (item === listItem) {
            count++;
        }
    }
    return count;
}

main();

