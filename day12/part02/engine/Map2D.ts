import Obj2D from "./Obj2D";
import Position2D from "./Position2D";

interface Map2D {

    readonly width: number;
    readonly height: number;

    listObjs(): Obj2D[];
    
    addObj(type: string, position: Position2D): Obj2D;
    getObjAt(position: Position2D): Obj2D | undefined;
    isPositionOccupied(position: Position2D): boolean;
    isValidPosition(position: Position2D): boolean;

}

export default Map2D;