import Obj from "./Obj";
import ObjMoveEvent from "./ObjMoveEvent";
import Player from "./Player";
import Position from "./Position";

interface Map2D {
    width: number;
    height: number;
    addObj(obj: Obj, position: Position): void;
    moveObj(obj: Obj, position: Position): void;
    getObjAt(position: Position): Obj | null;
    getPlayer(): Player;
    onAfterMove(listener: (evt: ObjMoveEvent) => void): void;
    isValidPosition(position: Position): boolean;
    isPositionOccupied(position: Position): boolean;
    listObjs(): Obj[];
    copy(): Map2D;
}

export default Map2D;