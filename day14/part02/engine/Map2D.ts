import Obj2D from "./Obj2D";
import Position2D from "./Position2D";

interface Map2D {

    readonly width: number;
    readonly height: number;

    isPositionOccupied(position: Position2D): boolean;

    isValidPosition(position: Position2D): boolean;

    listObjs(): Obj2D[];

    addObj(obj: Obj2D): Obj2D;

    moveObj(obj: Obj2D, position: Position2D): void

    getObjAt(position: Position2D): Obj2D | undefined;

    findObjsAt(position: Position2D): Obj2D[];

}

export default Map2D;