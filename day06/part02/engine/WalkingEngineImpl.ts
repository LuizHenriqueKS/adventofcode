import Direction from "./Direction";
import Map2D from "./Map2D";
import Player from "./Player";
import Position from "./Position";
import PositionAndDirection from "./PositionAndDirection";
import WalkingEngine from "./WalkingEngine";

class WalkingEngineImpl implements WalkingEngine {

    hasNextMove(map: Map2D): boolean {
        const player = this.getPlayer(map);
        return !!this.predictNextMove(map, player);
    }

    nextMove(map: Map2D): void {
        const player = this.getPlayer(map);
        const nextMove = this.predictNextMove(map, player);
        if (nextMove) {
            this.movePlayer(map, player, nextMove);
        }
    }

    private predictNextMove(map: Map2D, player: Player): PositionAndDirection | null {
        const nextPlayerPosition = this.getNextPlayerPosition(map, player);
        if (map.isValidPosition(nextPlayerPosition.position)) {
            return nextPlayerPosition;
        } else {
            return null;
        }
    }
    private getNextPlayerPosition(map: Map2D, player: Player): PositionAndDirection {
        let direction = player.direction;
        let currentPosition = player.position;
        for (let i = 0; i < 4; i++) {
            let nextPlayerPosition = this.getNextPositionByDirection(currentPosition, direction);
            if (!map.isPositionOccupied(nextPlayerPosition)) {
                return {position: nextPlayerPosition, direction};
            }
            direction = this.nextDirection(direction);
        }
        throw new Error("Player is stuck");
    }

    private getNextPositionByDirection(startPosition: Position, direction: Direction): Position {
        switch (direction) {
            case 'up': return {x: startPosition.x, y: startPosition.y - 1};
            case 'right': return {x: startPosition.x + 1, y: startPosition.y};
            case 'down': return {x: startPosition.x, y: startPosition.y + 1};
            case 'left': return {x: startPosition.x - 1, y: startPosition.y};
        }
    }

    private nextDirection(direction: Direction): Direction {
        switch (direction) {
            case 'up': return 'right';
            case 'right': return 'down';
            case 'down': return 'left';
            case 'left': return 'up';
        }
    }
    
    private getPlayer(map: Map2D): Player {
        return map.listObjs().find(obj => obj.type === 'player') as Player;
    }

    private movePlayer(map: Map2D, player: Player, nextPlayerPosition: PositionAndDirection) { 
        player.direction = nextPlayerPosition.direction;
        map.moveObj(player, nextPlayerPosition.position);
    }

}

export default WalkingEngineImpl;