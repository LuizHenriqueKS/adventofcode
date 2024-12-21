import Map2D from "./Map2D";

interface WalkingEngine {

    hasNextMove(map: Map2D): boolean;

    nextMove(map: Map2D): void;

}

export default WalkingEngine;