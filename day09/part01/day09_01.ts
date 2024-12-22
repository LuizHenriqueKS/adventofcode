import { readTextFile } from "../../util/inputUtils";

function main() {
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const diskmap = readTextFile(filename, __dirname).trim();
    const blocks = convertDiskmapToBlocks(diskmap);
    const compactedBlocks = moveBlocksFromEndToBeginning(blocks);
    const checksum = calcChecksum(compactedBlocks);
    //console.log(filename, "-> blocks:", blocks);
    //console.log(filename, "-> compacted-blocks:", compactedBlocks);
    console.log(filename, "-> checksum:", checksum);
    console.log("--------------------------------------------------");
}

function calcChecksum(blocks: number[]) {
    let result = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === -1) {
            break;
        }
        result += i * blocks[i];
    }
    return result;
}

function moveBlocksFromEndToBeginning(blocks: number[]): number[] {
    let result = [...blocks];
    for (let i = 0; i < result.length; i++) {
        if (result[i] === -1) {
            let index = findLastBlockIndex(result);
            if (index <= i) {
                break;
            }
            result[i] = result[index];
            result[index] = -1;
        }
    }
    return result;
}

function findLastBlockIndex(result: number[]) {
    for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] !== -1) {
            return i;
        }
    }
    return -1;
}

function convertDiskmapToBlocks(diskmap: string): number[] {
    let id = 0;
    let result = [];
    for (let i = 0; i < diskmap.length; i++) {
        let isFree = i % 2 === 1;
        let number = parseInt(diskmap[i]);
        if (isFree) {
            for (let j = 0; j < number; j++) {
                result.push(-1);
            }
        } else {
            for (let j = 0; j < number; j++) {
                result.push(id);
            }
            id++;
        }
    }
    return result;
}

main();
