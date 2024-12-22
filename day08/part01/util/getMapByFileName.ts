import { readLines } from "../../../util/inputUtils";
import Map2D from "../engine/Map2D";
import Map2DImpl from "../engine/Map2DImpl";
import path from 'path';

function getMapByFileName(filename: string): Map2D {
    const lines = readLines(filename, path.dirname(__dirname));
    const width = lines[0].length;
    const height = lines.length;
    const map: Map2D = new Map2DImpl({width, height, canOverlap: true});
    populateMap(map, lines);
    return map;
}

function populateMap(map: Map2D, lines: string[]) {
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const ch = lines[y][x];
            if (ch !== '.') {
                map.addObj(ch, {x, y});
            }
        }
    }
}

export default getMapByFileName;

