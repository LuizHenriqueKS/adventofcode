import getMapByFileName from "./util/getMapByFileName";
import Map2D from "./engine/Map2D";
import Obj2D from "./engine/Obj2D";
import Pair from "./engine/Pair";
import Position2D from "./engine/Position";
import saveMap from "./util/saveMap";

function main() {
    console.log("Day 8 - Part 1");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const map : Map2D = getMapByFileName(filename);
    findUniquePairs(map, pair => {
        findAntinodePositions(pair, antinodePosition => {
            if (map.isValidPosition(antinodePosition) && !map.findObjsAt(antinodePosition).find(obj => obj.type === '#')) {
                map.addObj('#', antinodePosition);
            }
        });
    });
    const antinodesCount = map.listObjs().filter(obj => obj.type === '#').length;
    saveMap(map, "out_" + filename, __dirname);
    console.log(filename, "-> result:", antinodesCount);
}

function findAntinodePositions(pair: Pair<Obj2D, Obj2D>, callback: (antinodePosition: Position2D) => void) {
    const diffPosition1 = calcDiffPosition(pair.first.position, pair.second.position);
    const diffPosition2 = calcDiffPosition(pair.second.position, pair.first.position);
    const antinodePositions = [
        sumPosition(pair.first.position, diffPosition1),
        sumPosition(pair.first.position, diffPosition2),
        sumPosition(pair.second.position, diffPosition1),
        sumPosition(pair.second.position, diffPosition2)
    ]
    .filter(position => position.x != pair.first.position.x && position.y != pair.first.position.y)
    .filter(position => position.x != pair.second.position.x && position.y != pair.second.position.y);
    antinodePositions.forEach(callback);
}

function calcDiffPosition(position1: Position2D, position2: Position2D): Position2D {
    return {x: position1.x - position2.x, y: position1.y - position2.y};
}

function sumPosition(position1: Position2D, position2: Position2D): Position2D {
    return {x: position1.x + position2.x, y: position1.y + position2.y};
}

function findUniquePairs(map: Map2D, callback: (pair: Pair<Obj2D, Obj2D>) => void) {
    const pairsAlreadyProcessed = new Set<string>();
    findPairs(map, pair => {
        const key1 = convertObj2DToString(pair.first) + convertObj2DToString(pair.second);
        const key2 = convertObj2DToString(pair.second) + convertObj2DToString(pair.first);
        if (pairsAlreadyProcessed.has(key1) || pairsAlreadyProcessed.has(key2)) {
            return;
        }
        pairsAlreadyProcessed.add(key1);
        callback(pair);
    });
}

function findPairs(map: Map2D, callback: (pair: Pair<Obj2D, Obj2D>) => void) {
    const objs2DByType = getObjs2DByType(map);
    for (const type in objs2DByType) {
        const objs = objs2DByType[type];
        combineObjs2D(objs, callback);
    }
}

function combineObjs2D(objs: Obj2D[], callback: (pair: Pair<Obj2D, Obj2D>) => void) {
    for (let i = 0; i < objs.length; i++) {
        for (let j = 0; j < objs.length; j++) {
            if (i !== j) {
                callback({first: objs[i], second: objs[j]});
            }
        }
    }
}

function getObjs2DByType(map: Map2D) : Record<string, Obj2D[]> {
    const objsByType : Record<string, Obj2D[]> = {};
    for (const obj of map.listObjs()) {
        if (!objsByType[obj.type]) {
            objsByType[obj.type] = [];
        }
        objsByType[obj.type].push(obj);
    }   
    return objsByType;
}

function convertObj2DToString(first: Obj2D) {
    return first.type + ":" + first.position.x + ',' + first.position.y;
}

main();

