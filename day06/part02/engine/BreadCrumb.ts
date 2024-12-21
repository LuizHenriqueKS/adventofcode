import Position from "./Position";
import PositionWithOptionalDirection from "./PositionWithOptionalDirection";

class BreadCrumb {

    private positions: string[] = [];
    private distinct: boolean;
    private direction: boolean;

    constructor(options: { distinct: boolean, direction?: boolean }) {
        this.distinct = options.distinct;
        this.direction = options.direction === undefined ? false : options.direction;
    }

    add(position: PositionWithOptionalDirection): void {
        if (this.distinct && this.has(position)) { 
            return;
        }
        const positionStr = this.convertPositionToStr(position);
        this.positions.push(positionStr);
    }

    has(position: PositionWithOptionalDirection): boolean {
        const positionStr = this.convertPositionToStr(position);
        return this.positions.indexOf(positionStr) != -1;
    }

    size(): number {
        return this.positions.length;
    }

    values(): PositionWithOptionalDirection[] {
        return this.positions.map(pos => this.convertStrToPosition(pos));
    }

    private convertStrToPosition(pos: string): PositionWithOptionalDirection {
        const parts = pos.split(",");
        return {
            x: parseInt(parts[0]),
            y: parseInt(parts[1]),
            direction: this.direction ? parts[2] : undefined
        };
    }

    private convertPositionToStr(position: PositionWithOptionalDirection): string {
        return position.x + "," + position.y + (this.direction ? "," + position.direction : "");
    }

}

export default BreadCrumb;