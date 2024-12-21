import { readLines } from "../../util/inputUtils";

function main() {
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const text = readLines(filename, __dirname);
    let count = 0;
    count += countXmas(text);
    count += countXmas(reverseRow(text));
    count += countXmas(swapColToRow(text));
    count += countXmas(reverseRow(swapColToRow(text)));
    count += countXmas(diagonal(text, 1));
    count += countXmas(reverseRow(diagonal(text, 1)));
    count += countXmas(diagonal(text, -1));
    count += countXmas(reverseRow(diagonal(text, -1)));
    console.log(filename, "->", count);
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

function swapColToRow(text: string[]): string[] {
    let result = [];
    for (let i = 0; i < text[0].length; i++) {
        let row = '';
        for (let j = 0; j < text.length; j++) {
            row += text[j][i];
        }
        result.push(row);
    }
    return result;
}

function reverseRow(text: string[]): string[] {
    return text.map(row => row.split('').reverse().join(''));
}

function countXmas(text: string[]): number {
    return countPattern(text, 'XMAS');
}

function countPattern(text: string[], pattern: string): number {
    let count = 0;
    for (const row of text) {
        count += row.split(pattern).length - 1;
    }
    return count;
}

main();
