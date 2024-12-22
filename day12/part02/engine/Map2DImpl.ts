import Map2D from "./Map2D";
import Obj2D from "./Obj2D";
import Position2D from "./Position2D";

class Map2DImpl implements Map2D {

    private objs: Obj2D[] = [];
    width: number;
    height: number;

    constructor(options: {width: number, height: number}) {
        this.width = options.width;
        this.height = options.height;
    }

    isPositionOccupied(position: Position2D): boolean {
        return this.findObjsAt(position).length > 0;
    }

    isValidPosition(position: Position2D): boolean {
        return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
    }

    listObjs(): Obj2D[] {
        return this.objs;
    }

    addObj(type: string, position: Position2D): Obj2D {
        this.requireValidPosition(position);
        this.requireNoOccupiedPosition(position);
        const obj: Obj2D = { type, position };
        this.objs.push(obj);
        return obj;
    }

    requireNoOccupiedPosition(position: Position2D) {
        if (this.isPositionOccupied(position)) {
            throw new Error("Position already occupied: " + position);
        }
    }

    requireValidPosition(position: Position2D) {
        if (!this.isValidPosition(position)) {
            throw new Error("Invalid position: " + position);
        }
    }

    getObjAt(position: Position2D): Obj2D | undefined {
        const objs = this.findObjsAt(position);
        if (objs.length === 0) {
            return undefined;
        } else if (objs.length === 1) {
            return objs[0];
        } else {
            throw new Error("Multiple objects at position: " + position);
        }
    }

    findObjsAt(position: Position2D): Obj2D[] {
        return this.objs.filter(obj => obj.position.x === position.x && obj.position.y === position.y);
    }

}

export default Map2DImpl;