import Obj from "../../../day06/part01/engine/Obj";
import Obj2D from "./Obj2D";
import Position2D from "./Position";

interface Map2D {

    width: number;
    height: number;

    addObj(type: string, position: Position2D): Obj2D;
    getObjAt(position: Position2D): Obj2D | null;
    findObjsAt(position: Position2D): Obj2D[];

    isOccupiedAt(position: Position2D): boolean;
    isValidPosition(position: Position2D): boolean;

    listObjs(): Obj2D[];

    onAfterAdd(listener: (obj: Obj2D) => void): void;

}

export default Map2D;