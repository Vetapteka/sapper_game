export class Coordinates {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static compare(c1: Coordinates, c2: Coordinates) {
        return c1.x == c2.x && c1.y == c2.y;
    }
}
