import Map2D from "../engine/Map2D";
import Map2DImpl from "../engine/Map2DImpl";
import Obstruction from "../engine/Obstruction";
import Player from "../engine/Player";
import inputs from "../inputs";

function getMapByFileName(filename: string): Map2D {
    const text = (inputs[filename] as string).trim().split("\r").join("").split("\n");
    const width = text[0].length;
    const height = text.length;
    const map: Map2D = new Map2DImpl(width, height);
    populateMap(map, text);
    return map;
}

function populateMap(map: Map2D, text: string[]) {
    for (let y = 0; y < text.length; y++) {
        for (let x = 0; x < text[y].length; x++) {
            const ch = text[y][x];
            if (ch === '#') {
                addObstruction(map, x, y);
            } else if (ch === '^') {
                addPlayer(map, x, y);
            }
        }
    }
}

function addObstruction(map: Map2D, x: number, y: number) {
    const obstruction: Obstruction = {
        type: 'obstruction', 
        position: {x, y}, 
        map: map
    };
    map.addObj(obstruction, obstruction.position);
}

function addPlayer(map: Map2D, x: number, y: number) {
    const player: Player = {
        type: 'player',
        position: {x, y},
        map: map,
        direction: 'up'
    }
    map.addObj(player, player.position);
}

export default getMapByFileName;