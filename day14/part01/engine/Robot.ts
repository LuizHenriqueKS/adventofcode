import Position from "../../../day06/part01/engine/Position";
import Obj2D from "./Obj2D";
import Position2D from "./Position2D";

interface Robot extends Obj2D {
    type: "robot";
    velocity: Position2D;
}

export default Robot;