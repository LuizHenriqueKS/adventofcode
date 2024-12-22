import getMapByFileName from "./util/getMapByFileName";
import Map2D from "./engine/Map2D";
import Obj2D from "./engine/Obj2D";
import Pair from "./engine/Pair";
import Position2D from "./engine/Position";
import saveMap from "./util/saveMap";

function main() {
    console.log("Day 8 - Part 2");
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const map : Map2D = getMapByFileName(filename);
    // let addedNewObjs = false;
    // map.onAfterAdd(obj => {
    //     addedNewObjs = true;
    // });
    // do {
    //     addedNewObjs = false;
    //     fillAntiNodes(map);
    // } while (addedNewObjs);
    fillAntiNodes(map);
    const antiNodesCount = map.listObjs().filter(obj => obj.type !== '.').length;
    saveMap(map, "out_" + filename, __dirname);
    console.log(filename, "-> result:", antiNodesCount);
}

function fillAntiNodes(map: Map2D) {
    findUniquePairs(map, pair => {
        findAntiNodePositions(map, pair, antiNodePosition => {
            if (map.isValidPosition(antiNodePosition) && !map.isOccupiedAt(antiNodePosition)) {
                map.addObj(pair.first.type, antiNodePosition).subtype = '#';
            }
        });
    });
}

function hasAtLeastOneNoAntiNode(pair: Pair<Obj2D, Obj2D>) {
    return !pair.first.subtype || !pair.second.subtype;
}

function hasAlreadyAntiNode(map: Map2D, antiNodePosition: Position2D) {
    return map.findObjsAt(antiNodePosition).find(obj => obj.subtype === '#')
}

function findAntiNodePositions(map: Map2D, pair: Pair<Obj2D, Obj2D>, callback: (antiNodePosition: Position2D) => void) {
    const diffPosition1 = calcDiffPosition(pair.first.position, pair.second.position);
    const diffPosition2 = calcDiffPosition(pair.second.position, pair.first.position);
    let antiNodePositions: Position2D[] = [];
    doSumUntilInvalidPosition(map, pair.first.position, diffPosition1, position => antiNodePositions.push(position));
    doSumUntilInvalidPosition(map, pair.first.position, diffPosition2, position => antiNodePositions.push(position));
    doSumUntilInvalidPosition(map, pair.second.position, diffPosition1, position => antiNodePositions.push(position));
    doSumUntilInvalidPosition(map, pair.second.position, diffPosition2, position => antiNodePositions.push(position));
    antiNodePositions = antiNodePositions.filter(position => position.x != pair.first.position.x && position.y != pair.first.position.y)
    antiNodePositions = antiNodePositions.filter(position => position.x != pair.second.position.x && position.y != pair.second.position.y);
    antiNodePositions.forEach(callback);
}

function doSumUntilInvalidPosition(map: Map2D, initialPosition: Position2D, stepPosition: Position2D, callback: (position: Position2D) => void) {
    let nextPosition = sumPosition(initialPosition, stepPosition);
    while (map.isValidPosition(nextPosition)) {
        callback(nextPosition);
        nextPosition = sumPosition(nextPosition, stepPosition);
    }
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

