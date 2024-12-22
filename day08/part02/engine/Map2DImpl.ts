import Position from "../../../day06/part01/engine/Position";
import Map2D from "./Map2D";
import Obj2D from "./Obj2D";
import Position2D from "./Position";

class Map2DImpl implements Map2D {

    width: number;
    height: number;
    canOverlap: boolean;

    objs: Obj2D[] = [];
    onAfterAddListeners: ((obj: Obj2D) => void)[] = [];

    constructor(options: {width: number, height: number, canOverlap: boolean}) {
        this.width = options.width;
        this.height =  options.height;
        this.canOverlap = options.canOverlap;
    }

    onAfterAdd(listener: (obj: Obj2D) => void): void {
        this.onAfterAddListeners.push(listener);
    }

    addObj(type: string, position: Position2D): Obj2D {
        this.requireValidPosition(position);
        this.requireNoOverlap(position);
        const obj: Obj2D = {
            position, type
        }
        this.objs.push(obj);
        this.onAfterAddListeners.forEach(listener => listener(obj));
        return obj;
    }
    
    findObjsAt(position: Position2D): Obj2D[] {
        return this.objs.filter(obj => obj.position.x === position.x && obj.position.y === position.y);
    }

    getObjAt(position: Position2D): Obj2D | null {
        const objs = this.findObjsAt(position);
        if (objs.length === 0) {
            return null;
        } else if (objs.length === 1) {
            return objs[0];
        } else {
            throw new Error(`Multiple objects at position: ${position.x}, ${position.y}`);
        }
    }

    isOccupiedAt(position: Position2D): boolean {
        return this.objs.some(obj => obj.position.x === position.x && obj.position.y === position.y);
    }

    isValidPosition(position: Position2D): boolean {
        return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
    }

    listObjs(): Obj2D[] {
        return this.objs;
    }    

    requireValidPosition(position: Position2D) {
        if (!this.isValidPosition(position)) {
            throw new Error(`Invalid position: ${position.x}, ${position.y}`);
        }
    }

    requireNoOverlap(position: Position2D) {
        if (!this.canOverlap && this.isOccupiedAt(position)) {
            throw new Error(`Position occupied: ${position.x}, ${position.y}`);
        }
    }

}

export default Map2DImpl;