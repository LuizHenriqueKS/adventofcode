import Map2D from "./Map2D";
import Obj2D from "./Obj2D";
import Position2D from "./Position2D";

class Map2DImpl implements Map2D {
    
    width: number;
    height: number;
    private objs: Obj2D[] = [];

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
        return [...this.objs];
    }

    addObj(obj: Obj2D): Obj2D {
        obj.position = this.fixPosition(obj.position);
        this.requireValidPosition(obj.position);
        this.objs.push(obj);
        return obj;
    }

    moveObj(obj: Obj2D, position: Position2D): void {
        position = this.fixPosition(position);
        this.requireValidPosition(position);
        obj.position = position;
    }

    requireValidPosition(position: Position2D) {
        if (!this.isValidPosition(position)) {
            throw new Error("Invalid position: " + position);
        }
    }

    getObjAt(position: Position2D): Obj2D | undefined {
        position = this.fixPosition(position);
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
        position = this.fixPosition(position);
        return this.listObjs().filter(obj => obj.position.x === position.x && obj.position.y === position.y);
    }

    fixPosition(position: Position2D): Position2D {
        let x = (position.x + this.width) % this.width;
        let y = (position.y + this.height) % this.height;
        while (x < 0) {
            x += this.width;
        }
        while (y < 0) {
            y += this.height;
        }
        return {x, y};
    }

}

export default Map2DImpl;