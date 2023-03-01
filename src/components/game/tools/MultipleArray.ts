import { Coordinates } from './Coordinates';

export class MultipleArray {
    _array: Array<Array<number>>;
    isExist;

    constructor(x: number, y: number) {
        this._array = this._createArray(x, y);
        this.isExist = this._getIsExistFunction(x, y);
    }

    _createArray(x: number, y: number): Array<Array<number>> {
        const array = [];
        for (let i: number = 0; i < y; i++) {
            array.push(new Array(x).fill(0));
        }

        return array;
    }

    _getIsExistFunction(x: number, y: number) {
        return (coords: Coordinates) =>
            coords.y < y && coords.x < x && coords.x >= 0 && coords.y >= 0;
    }

    getValue(coords: Coordinates): number {
        return this._array[coords.y][coords.x];
    }

    setValue(coords: Coordinates, value: number) {
        this._array[coords.y][coords.x] = value;
    }

    inc(coords: Coordinates) {
        this._array[coords.y][coords.x] += 1;
    }
}
