import { readLines } from "../../util/inputUtils";

function main() {
    test("input_test01.txt");
    test("input_test02.txt");
    test("input_test03.txt");
    test("input_test04.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const lines = readLines(filename, __dirname);
    const matrix = lines.map(line => line.split('').map(Number));
    const queue: QueueItem[] = [];
    const startPositions = findStartPositions(matrix);   
    const trails: Trail[] = [];
    populateQueue(queue, startPositions.map(p => createQueueItemByStartPosition(p)));
    while (queue.length > 0) {
        processQueue(matrix, queue, {
            onTrailCompleted: evt => {
                trails.push(evt.trail);
            }
        });
    }
    const ratings = countRatingsByStartPosition(trails);
    const result = Array.from(ratings.values()).reduce((a, b) => a + b, 0);
    console.log(filename, "-> result:", result);
}

function countRatingsByStartPosition(trails: Trail[]): Map<string, number> {
    const ratingsByStartPosition = new Map<string, number>();
    for (const trail of trails) {
        const start = trail[0];
        const key = `${start.x},${start.y}`;
        const rating = ratingsByStartPosition.get(key) || 0;
        ratingsByStartPosition.set(key, rating + 1);
    }
    return ratingsByStartPosition;
}

function countTrailsByStartAndEndPosition(trails: Trail[]) {
    const counts = new Set<string>();
    for (const trail of trails) {
        const start = trail[0];
        const end = trail[trail.length - 1];
        counts.add(`${start.x},${start.y}-${end.x},${end.y}`);
    }
    return counts.size;
}

function processQueue(matrix: Matrix, queue: QueueItem[], evts: { onTrailCompleted: TrailCompletedListener; }) {
    const item = queue.shift();
    if (item) {
        for (const nextPosition of listNeighboringPositions(matrix, item.currentPosition)) {
            let nextHeight = item.currentHeight + 1;
            if (getHeightAt(matrix, nextPosition) === nextHeight) {
                const nextTrail = [...item.trail, nextPosition];
                if (nextHeight === 9) {
                    evts.onTrailCompleted({trail: nextTrail});
                } else {
                    queue.push({
                        startPosition: item.startPosition,
                        currentPosition: nextPosition,
                        currentHeight: item.currentHeight + 1,
                        trail: nextTrail
                    });
                }
            }
        }
    }
}

function listNeighboringPositions(matrix: Matrix, currentPosition: Position) {
    const positions = [];
    const x = currentPosition.x;
    const y = currentPosition.y;
    if (x > 0) {
        positions.push({x: x - 1, y});
    }
    if (x < matrix[0].length - 1) {
        positions.push({x: x + 1, y});
    }
    if (y > 0) {
        positions.push({x, y: y - 1});
    }
    if (y < matrix.length - 1) {
        positions.push({x, y: y + 1});
    }
    return positions;
}

function findStartPositions(matrix: Matrix): Position[] {
    const positions = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
           if (getHeightAt(matrix, {x, y}) === 0) {
               positions.push({x, y});
           }
        }
    }
    return positions;
}

function getHeightAt(matrix: Matrix, position: Position): number {
    return matrix[position.y][position.x];
}

function createQueueItemByStartPosition(position: Position): QueueItem {
    return {
        startPosition: position,
        currentPosition: position,
        trail: [position],
        currentHeight: 0
    };
}

function populateQueue(queue: QueueItem[], items: QueueItem[]) {
    for (const item of items) {
        queue.push(item);
    }
}

type Matrix = number[][];
type Trail = Position[];
type TrailCompletedListener = (evt: TrailCompletedEvent) => void;

interface TrailCompletedEvent {
    trail: Position[];
}

interface QueueItem {
    startPosition: Position;
    currentPosition: Position;
    currentHeight: number;
    trail: Position[];
}

interface Position {
    x: number;
    y: number;
}

main();