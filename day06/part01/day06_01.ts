import BreadCrumb from "./engine/BreadCrumb";
import CachedWalkingEngineImpl from "./engine/CachedWalkingEngineImpl";
import WalkingEngine from "./engine/WalkingEngine";
import WalkingEngineImpl from "./engine/WalkingEngineImpl";
import getMapByFileName from "./util/getMapByFileName";

function main() {
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const map = getMapByFileName(filename);
    const distinctBreadCrumb = new BreadCrumb({distinct: true});
    const breadCrumb = new BreadCrumb({distinct: false});
    map.onAfterMove(evt => {
        if (evt.obj.type === 'player') {
            distinctBreadCrumb.add(evt.oldPosition);
            breadCrumb.add(evt.oldPosition);
        }
    }); 
    const engine : WalkingEngine = new CachedWalkingEngineImpl();
    while (engine.hasNextMove(map)) {
        engine.nextMove(map);
    }
    const player = map.getPlayer();
    distinctBreadCrumb.add(player.position);
    breadCrumb.add(player.position);
    console.log(filename, "-> breadcrumbs: ", breadCrumb.size(), ' or ', distinctBreadCrumb.size(), '(distincts)');
}

main();