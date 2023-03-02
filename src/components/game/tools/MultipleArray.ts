import { Coordinates } from './Coordinates';

export class MultipleArray {
    _array: Array<Array<any>>;
    isExist;

    constructor(x: number, y: number, defaultValue: any) {
        this._array = this._createArray(x, y, defaultValue);
        this.isExist = this._getIsExistFunction(x, y);
    }

    _createArray(x: number, y: number, defaultValue: any): Array<Array<any>> {
        const array = [];
        for (let i: number = 0; i < y; i++) {
            array.push(new Array(x).fill(defaultValue));
        }

        return array;
    }

    _getIsExistFunction(x: number, y: number) {
        return (coords: Coordinates) =>
            coords.y < y && coords.x < x && coords.x >= 0 && coords.y >= 0;
    }

    getValue(coords: Coordinates): any {
        return this._array[coords.y][coords.x];
    }

    setValue(coords: Coordinates, value: any) {
        this._array[coords.y][coords.x] = value;
    }
}

export class NumberMultipleArray extends MultipleArray {
    inc(coords: Coordinates) {
        this._array[coords.y][coords.x] += 1;
    }
}
