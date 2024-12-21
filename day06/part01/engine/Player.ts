import Obj from "./Obj";
import Direction from "./Direction";

interface Player extends Obj {
    type: 'player';
    direction: Direction;
}

export default Player;