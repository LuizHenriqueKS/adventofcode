import { readTextFile } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_test2.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const text = readTextFile(filename, __dirname);
    const pairs = listPairs(text);
    const result = pairs
        .map(pair => pair[0] * pair[1])
        .reduce((acc, curr) => acc + curr, 0);
    console.log(filename, "->", result);
}


function listPairs(text: string) {
    const regex = /mul\((\d+),(\d+)\)/gm
    let match;
    let result = [];
    while ((match = regex.exec(text)) !== null) {
        result.push([match[1], match[2]].map(Number));
    }
    return result;
}

main();