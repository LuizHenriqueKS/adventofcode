import { readLines } from "../../util/inputUtils";

function main() {
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const text = readLines(filename, __dirname);
    let count = 0;
    let _3x3s = listAll3x3(text);
    for (const _3x3 of _3x3s) {
        if (isXmas(_3x3)) {
            count++;
        }
    }
    console.log(filename, "->", count);
}

function listAll3x3(text: string[]) {
    const result = [];
    for (let row = 0; row < text.length - 2; row++) {
        for (let col = 0; col < text[0].length - 2; col++) {
            let _3x3 = [];
            for (let i = 0; i < 3; i++) {
                _3x3.push(text[row + i].substring(col, col + 3));
            }
            result.push(_3x3);
        }
    }
    return result;
}

function isXmas(text: string[]): boolean {
    let count = 0;
    count += countMas(diagonal(text, 1));
    count += countMas(reverseRow(diagonal(text, 1)));
    count += countMas(diagonal(text, -1));
    count += countMas(reverseRow(diagonal(text, -1)));
    return count > 1;
}

function diagonal(text: string[], step: number): string[] {
    let result = [];
    for (let offsetCol = - text[0].length; offsetCol < text[0].length * 2; offsetCol++) {
        let line = "";
        for (let row = 0; row < text.length; row++) {
            let col = row * step + offsetCol;
            if (col >= 0 && col < text[0].length) {
                line += text[row][col];
            }        
        }
        if (line.length > 0) {
            result.push(line);
        }
    }
    return result;
}

function reverseRow(text: string[]): string[] {
    return text.map(row => row.split('').reverse().join(''));
}

function countMas(text: string[]): number {
    return countPattern(text, 'MAS');
}

function countPattern(text: string[], pattern: string): number {
    let count = 0;
    for (const row of text) {
        count += row.split(pattern).length - 1;
    }
    return count;
}

main();