import Map2D from "./Map2D";
import Obj from "./Obj";
import ObjMoveEvent from "./ObjMoveEvent";
import Player from "./Player";
import Position from "./Position";

class Map2DImpl implements Map2D {
    
    width: number;
    height: number;
    objects: Obj[] = [];
    onAfterMoveListeners: ((evt: ObjMoveEvent) => void)[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    copy(): Map2D {
        const copy = new Map2DImpl(this.width, this.height);
        this.listValidObjects().forEach(o => copy.addObj({...o}, {...o.position}));
        return copy;
    }

    getPlayer(): Player {
        return this.listValidObjects().find(o => o.type === 'player') as Player;
    }

    getObjAt(position: Position): Obj | null {
        return this.listValidObjects().find(o => o.position.x === position.x && o.position.y === position.y) || null;
    }

    listObjs(): Obj[] {
        return this.listValidObjects();
    }

    isValidPosition(position: Position): boolean {
        return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
    }

    addObj(obj: Obj, position: Position): void {
        this.requireValidPosition(obj.position);
        this.requireNoOccupiedPosition(obj.position);
        obj.map = this;
        obj.position = position;
        this.objects.push(obj);
    }

    moveObj(obj: Obj, position: Position): void {
        if (obj.position.x === position.x && obj.position.y === position.y) {
            return;
        }
        this.requireValidPosition(position);
        this.requireNoOccupiedPosition(position);
        const oldPosition = obj.position;
        obj.position = position;
        this.onAfterMoveListeners.forEach(listener => listener({obj, oldPosition, newPosition: position}));
    }

    onAfterMove(listener: (evt: ObjMoveEvent) => void): void {
        this.onAfterMoveListeners.push(listener);
    }

    isPositionOccupied(position: Position): boolean {
        return this.listValidObjects().some(o => o.position.x === position.x && o.position.y === position.y);
    }

    listValidObjects(): Obj[] {
        return this.objects.filter(o => o.map === this);
    }

    requireNoOccupiedPosition(position: Position): void {
        if (this.isPositionOccupied(position)) {
            throw new Error("Position already occupied");
        }
    }

    requireValidPosition(position: Position): void {
        if (!this.isValidPosition(position)) {
            throw new Error("Invalid position");
        }
    }


}

export default Map2DImpl;