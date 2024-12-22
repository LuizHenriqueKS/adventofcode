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
    //console.log(filename, "-> diskmap:", diskmap);
    //console.log(filename, "-> blocks:", blocks);
    //console.log(filename, "-> compacted-blocks:", compactedBlocks);
    console.log(filename, "-> checksum:", checksum);
    console.log("--------------------------------------------------");
}

function calcChecksum(blocks: number[]) {
    let result = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] !== -1) {
            result += i * blocks[i];
        }
    }
    return result;
}

function moveBlocksFromEndToBeginning(numbers: number[]): number[] {
    let blocks = numbersToFilledBlocks(numbers);
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        if (block.id !== -1) {
            const freeIndex = findFreeIndex(blocks, block.size);
            if (freeIndex >= 0 && freeIndex < block.index) {
                block.index = freeIndex;
            }
        }
    }
    return filledBlocksToNumbers(blocks);
}

function filledBlocksToNumbers(blocks: Block[]): number[] {
    let result = [];
    let index = 0;
    blocks.sort((a, b) => a.index - b.index);
    for (const block of blocks) {
        for (let i = index; i < block.index; i++) {
            result.push(-1);
        }
        for (let i = 0; i < block.size; i++) {
            result.push(block.id);
        }
        index = result.length;
    }
    return result;
}

function numbersToFilledBlocks(numbers: number[]): Block[] {
    let result: Block[] = [];
    let index = 0;
    let id = -1;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === id) {
            continue;
        }
        if (id >= 0) {
            result.push({ id, index, size: i - index });
        }
        id = numbers[i];
        index = i;
    }
    const size = numbers.length - index;
    if (size > 0) {
        result.push({ id, index, size });
    }
    return result;
}

function findFreeIndex(blocks: Block[], size: number): number {
    const freeBlocks = findFreeBlocksByFilledBlocks(blocks);
    for (const freeBlock of freeBlocks) {
        if (freeBlock.size >= size) {
            return freeBlock.index;
        }
    }
    return -1;
}

function findFreeBlocksByFilledBlocks(filledBlocks: Block[]): Block[] {
    filledBlocks = [...filledBlocks];
    let result: Block[] = [];
    let index = 0;
    let size;
    filledBlocks.sort((a, b) => a.index - b.index);
    for (const filledBlock of filledBlocks) {
        size = filledBlock.index - index;
        if (size > 0) {
            result.push({ id: -1, index, size });
        }
        index = filledBlock.index + filledBlock.size;
    }
    return result;
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


interface Block {
    id: number;
    index: number;
    size: number;
}

main();
