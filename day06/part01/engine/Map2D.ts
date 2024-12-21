import Obj from "./Obj";
import ObjMoveEvent from "./ObjMoveEvent";
import Position from "./Position";

interface Map2D {
    width: number;
    height: number;
    addObj(obj: Obj, position: Position): void;
    moveObj(obj: Obj, position: Position): void;
    getObjAt(position: Position): Obj | null;
    getPlayer(): Obj;
    onAfterMove(listener: (evt: ObjMoveEvent) => void): void;
    isValidPosition(position: Position): boolean;
    isPositionOccupied(position: Position): boolean;
    listObjs(): Obj[];
}

export default Map2D;