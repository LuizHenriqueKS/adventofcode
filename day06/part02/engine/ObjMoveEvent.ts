import Obj from "./Obj";
import Position from "./Position";

interface ObjMoveEvent {
    obj: Obj;
    oldPosition: Position;
    newPosition: Position;
}

export default ObjMoveEvent;
