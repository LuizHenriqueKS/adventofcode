import BreadCrumb from "./engine/BreadCrumb";
import CachedWalkingEngineImpl from "./engine/CachedWalkingEngineImpl";
import Map2D from "./engine/Map2D";
import ObjMoveEvent from "./engine/ObjMoveEvent";
import inputs from "./inputs";
import getMapByFileName from "./util/getMapByFileName";

let selectFile = {} as HTMLSelectElement;
let playButton = {} as HTMLButtonElement;
let speed = {} as HTMLInputElement;
let interval = {} as NodeJS.Timeout;
let running = false;
let stopping = false;
let gameArea = {} as HTMLDivElement; 
let tileWidth = 20;
let tileHeight = 20;
let tiles = [] as any[][];
let time = 0;
let distinctBreadCrumb = {} as BreadCrumb;
let breadCrumb = {} as BreadCrumb;
let map = {} as Map2D;

function main() {
    loadFields();
    updateSelectFile();
    playButton.onclick = () => onClickplayButton();
}

function loadFields() {
    selectFile = document.getElementById("selectFile") as HTMLSelectElement;
    playButton = document.getElementById("playButton") as HTMLButtonElement;
    speed = document.getElementById("speed") as HTMLInputElement;
    gameArea = document.getElementById("gameArea") as HTMLDivElement;
}

function updateSelectFile() {
    const fileNames = Object.keys(inputs);
    selectFile.innerHTML = '';
    fileNames.forEach(fileName => {
        const option = document.createElement("option");
        option.value = fileName;
        option.text = fileName;
        selectFile.appendChild(option);
    });
}

function onClickplayButton() {
    if (running) {
        stop();
    } else {
        play();
    }
}

function stop() {
    stopping = true;
    playButton.innerHTML = "Stoping...";
}

function play() {
    time = 0;
    const filename = selectFile.value;
    const speedValue = parseInt(speed.value);
    map = getMapByFileName(filename);
    distinctBreadCrumb = new BreadCrumb({distinct: true});
    breadCrumb = new BreadCrumb({distinct: false});
    createNewGameArea(map);
    map.onAfterMove(evt => {
        time++;
        if (evt.obj.type === 'player') {
            distinctBreadCrumb.add(evt.oldPosition);
            breadCrumb.add(evt.oldPosition);
        }
        updateViewStatus();
        movePlayer(evt);
    });
    const engine = new CachedWalkingEngineImpl();
    interval = setInterval(() => {
        if (stopping || !engine.hasNextMove(map)) {
            
            const player = map.getPlayer();
            distinctBreadCrumb.add(player.position);
            breadCrumb.add(player.position);
            updateViewStatus();

            console.log(filename, "-> breadcrumbs: ", breadCrumb.size(), ' or ', distinctBreadCrumb.size(), '(distincts)');
            clearInterval(interval);
            onStop();

        } else {
            engine.nextMove(map);
        }
    }, speedValue);
    onStart();
}

function onStop() {
    running = false;
    stopping = false;
    playButton.innerHTML = "Play";
}

function onStart() {
    running = true;
    stopping = false;
    playButton.innerHTML = "Stop";
}

function createNewGameArea(map: Map2D) {
    gameArea.innerHTML = '';
    tiles = [];
    for (let y = 0; y < map.height; y++) {
        const row = [];
        for (let x = 0; x < map.width; x++) {
            const el = document.createElement("div");
            const evenOrOdd = (x + y) % 2 === 0 ? "even" : "odd";
            const obj = map.getObjAt({x, y});
            el.style.width = tileWidth + "px";
            el.style.height = tileHeight + "px";
            el.classList.add("tile", "empty", evenOrOdd);
            if (obj) {
                if (obj.type !== 'player') {
                    el.classList.add("obstruction");
                } else if (obj.type === 'player') {
                    el.classList.add("player");
                }
            }
            el.style.display = "inline-block";
            el.style.top = (y * tileHeight) + "px";
            el.style.left = (x * tileWidth) + "px";
            el.style.position = "absolute";
            gameArea.appendChild(el);
            row.push({el, status: 'empty'});
        }
        tiles.push(row);
    }
    gameArea.style.width = (map.width * tileWidth) + "px";
    gameArea.style.height = (map.height * tileHeight) + "px";
}

function updateViewStatus() {
    document.querySelector("#time .value")!.innerHTML = time.toString();
    document.querySelector("#breadcrumbs .value")!.innerHTML = distinctBreadCrumb.size() + "/" + breadCrumb.size();
}

function movePlayer(evt: ObjMoveEvent) {
    const {obj, oldPosition, newPosition} = evt;
    const fromTile = tiles[oldPosition.y][oldPosition.x];
    const toTile = tiles[newPosition.y][newPosition.x];
    fromTile.el.classList.remove("player");
    fromTile.el.classList.add("breadcrumb");
    toTile.el.classList.add("player");
}

setTimeout(main, 100);
