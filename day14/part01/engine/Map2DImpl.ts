import Map2D from "./Map2D";
import Obj2D from "./Obj2D";
import Position2D from "./Position2D";

class Map2DImpl implements Map2D {
    
    width: number;
    height: number;

    constructor(options: {width: number, height: number}) {
        this.width = options.width;
        this.height = options.height;
    }

    isPositionOccupied(position: Position2D): boolean {
        throw new Error("Method not implemented.");
    }

    isValidPosition(position: Position2D): boolean {
        throw new Error("Method not implemented.");
    }

    listObjs(): Obj2D[] {
        throw new Error("Method not implemented.");
    }

    addObj(type: string, position: Position2D): Obj2D {
        throw new Error("Method not implemented.");
    }

    moveObj(obj: Obj2D, position: Position2D): void {

    }

    getObjAt(position: Position2D): Obj2D | undefined {
        throw new Error("Method not implemented.");
    }

    findObjsAt(position: Position2D): Obj2D[] {
        throw new Error("Method not implemented.");
    }

}

export default Map2DImpl;