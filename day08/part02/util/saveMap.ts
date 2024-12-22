import path from 'path';
import fs from 'fs';
import Map2D from '../engine/Map2D';

function saveMap(map: Map2D, filename: string, dir: string) {
    const fullPath = path.join(dir, filename);
    const text = mapToString(map);
    fs.writeFileSync(fullPath, text);
}

function mapToString(map: Map2D): string {
    let text = "";
    let row;
    let objs;
    for (let y = 0; y < map.height; y++) {
        row = "";
        for (let x = 0; x < map.width; x++) {
            objs = map.findObjsAt({x, y});
            if (objs.length > 0) {
                row += objs[0].subtype || objs[0].type;
            } else {
                row += ".";
            }
        }
        text += row + '\n';
    }
    return text;
}

export default saveMap;