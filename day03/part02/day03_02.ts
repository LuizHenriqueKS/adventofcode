import { readTextFile } from "../../util/inputUtils";

function main() {
    test("input_test.txt");
    test("input_test2.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const text = readTextFile(filename, __dirname);
    const pairs = listPairs(text);
    const dos = listDos(text);
    const enabledPairs = pairs.filter(pair => isEnabledPair(pair, dos));
    const result = enabledPairs
        .map(pair => pair.pairs[0] * pair.pairs[1])
        .reduce((acc, curr) => acc + curr, 0);
    console.log(filename, "->", result);
}

function isEnabledPair(pair: any, dos: any) {
    let enabled = true;
    for (const d of dos) {
        if (pair.index < d.index) {
            break;
        } else if (d.pattern == 'do()') {
            enabled = true            
        } else if (d.pattern == "don't()") {
            enabled = false;
        }
    }
    return enabled;
}

function listPairs(text: string) {
    const regex = /mul\((\d+),(\d+)\)/gm
    let match;
    let result = [];
    while ((match = regex.exec(text)) !== null) {
        const numbers = [match[1], match[2]].map(Number);
        result.push({pairs: numbers, index: match.index});
    }
    return result;
}

function listDos(text: string) {
    const regex = /(do\(\)|don\'t\(\))/gm
    let match;
    let result = [];
    while ((match = regex.exec(text)) !== null) {
        result.push({ pattern: match[1], index: match.index });
    }
    return result;
}

main();