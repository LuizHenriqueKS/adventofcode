import Position from "./Position";

class BreadCrumb {

    private positions: string[] = [];
    private distinct: boolean;

    constructor(options: { distinct: boolean }) {
        this.distinct = options.distinct;
    }

    add(position: Position) {
        if (this.distinct && this.has(position)) { 
            return;
        }
        const positionStr = this.convertPositionToStr(position);
        this.positions.push(positionStr);
    }

    has(position: Position): boolean {
        const positionStr = this.convertPositionToStr(position);
        return this.positions.indexOf(positionStr) != -1;
    }

    size(): number {
        return this.positions.length;
    }

    private convertPositionToStr(position: Position): string {
        return position.x + "," + position.y;
    }

}

export default BreadCrumb;