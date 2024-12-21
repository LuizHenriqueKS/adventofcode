import BreadCrumb from "./engine/BreadCrumb";
import CachedWalkingEngineImpl from "./engine/CachedWalkingEngineImpl";
import Map2D from "./engine/Map2D";
import Obstruction from "./engine/Obstruction";
import Player from "./engine/Player";
import Position from "./engine/Position";
import WalkingEngine from "./engine/WalkingEngine";
import WalkingEngineImpl from "./engine/WalkingEngineImpl";
import WalkingResult from "./engine/WalkingResult";
import getMapByFileName from "./util/getMapByFileName";

function main() {
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const map = getMapByFileName(filename);
    const engine : WalkingEngine = new CachedWalkingEngineImpl();
    const result = simulateWalking(map.copy(), engine);
    const uniqueBreadcrumbPositions = getUniqueBreadCrumbPositions(result.breadcrumb);
    let totalLoop = 0;
    let progressTotal = uniqueBreadcrumbPositions.length;
    let progress = 0;
    for (const pos of uniqueBreadcrumbPositions) {
        progress++;
        if (progress % 100 === 0) {
            console.log(filename, "-> progress: ", progress, "/", progressTotal);
        }
        if (!map.isPositionOccupied(pos)) {
            const currentMap = map.copy();
            const obstruction : Obstruction = {
                type: 'obstruction',
                position: pos,
                map: currentMap
            };
            currentMap.addObj(obstruction, obstruction.position);
            const result2 = simulateWalking(currentMap, engine);    
            if (result2.inLoop) {
                totalLoop++;     
            }
        }
    }
    console.log(filename, "-> loops:", totalLoop);
}

function getUniqueBreadCrumbPositions(breadcrumb: BreadCrumb): Position[] {
    const distinctBreadCrumb = new BreadCrumb({distinct: true, direction: false});
    for (const pos of breadcrumb.values()) {
        distinctBreadCrumb.add(pos);
    }
    return distinctBreadCrumb.values();
}

function simulateWalking(map: Map2D, engine: WalkingEngine): WalkingResult {
    const breadcrumb = new BreadCrumb({distinct: true, direction: true});
    let steps = 0;
    let inLoop = false;
    const player = map.getPlayer();
    map.onAfterMove(evt => {
        if (evt.obj.type === 'player') {
            const player = evt.obj as Player;
            if (breadcrumb.has({x: evt.oldPosition.x, y: evt.oldPosition.y, direction: player.direction})) {
                inLoop = true;
            }
            breadcrumb.add({x: evt.oldPosition.x, y: evt.oldPosition.y, direction: player.direction});
        }
    });
    while (!inLoop && engine.hasNextMove(map)) {
        engine.nextMove(map);
        steps++;
    }
    breadcrumb.add({x: player.position.x, y: player.position.y, direction: player.direction});
    return {steps, breadcrumb, inLoop};
}


main();