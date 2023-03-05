import { Coordinates } from './Coordinates';

export class MultipleArray {
    protected array: Array<Array<any>>;
    protected x: number;
    protected defaultValue;
    isExist;

    constructor(x: number, y: number, defaultValue: any) {
        this.array = this.createArray(x, y, defaultValue);
        this.x = x;
        this.defaultValue = defaultValue;
        this.isExist = this.getIsExistFunction(x, y);
    }

    getCoordsByLineCoords(value: number): Coordinates {
        return { x: value % this.x, y: Math.floor(value / this.x) };
    }

    getLineCoordsByCoords(coords: Coordinates): number {
        return coords.y * this.x + coords.x;
    }

    private createArray(
        x: number,
        y: number,
        defaultValue: any
    ): Array<Array<any>> {
        const array = [];
        for (let i: number = 0; i < y; i++) {
            array.push(new Array(x).fill(defaultValue));
        }

        return array;
    }

    private getIsExistFunction(x: number, y: number) {
        return (coords: Coordinates) =>
            coords.y < y && coords.x < x && coords.x >= 0 && coords.y >= 0;
    }

    getValue(coords: Coordinates): any {
        return this.array[coords.y][coords.x];
    }

    setValue(coords: Coordinates, value: any) {
        this.array[coords.y][coords.x] = value;
    }

    getValuesInLine(): Array<any> {
        const aaa = new Array<any>();

        this.array.forEach((array) => {
            array.forEach((el) => aaa.push(el));
        });

        return aaa;
    }

    getArray() {
        return this.array;
    }

    clear() {
        this.array.forEach((innerArray) => {
            for (let i = 0; i < this.x; i++) {
                innerArray[i] = this.defaultValue;
            }
        });
    }
}

export class NumberMultipleArray extends MultipleArray {
    constructor(x: number, y: number, defaultValue: any) {
        super(x, y, defaultValue);
    }

    inc(coords: Coordinates) {
        this.array[coords.y][coords.x] += 1;
    }
}
