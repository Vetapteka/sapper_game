import { Coordinates } from './Coordinates';
import { MultipleArray } from './MultipleArray';
import { getRandomIndex } from './tools';

export class GameField {
    _field: MultipleArray;
    _bombCount: number;
    _x: number;
    _y: number;
    _getNeighboursCoords;

    constructor(
        bombCount: number,
        x: number,
        y: number,
        neighbourRadius: number
    ) {
        this._bombCount = bombCount;
        this._x = x;
        this._y = y;
        this._field = new MultipleArray(x, y);
        this._getNeighboursCoords =
            this._getNeighboursCoordPattern(neighbourRadius);
    }

    get field(): MultipleArray {
        return this._field;
    }

    fillField() {
        for (let i: number = 0; i < this._bombCount; i++) {
            const bombCoords = this._createBomb();
            this._notifyNeighbours(bombCoords);
        }
    }

    _createBomb(): Coordinates {
        let bombCoords: Coordinates;
        do {
            bombCoords = {
                x: getRandomIndex(0, this._x),
                y: getRandomIndex(0, this._y),
            };
        } while (this._isCoordBomb(bombCoords));

        this._field.setValue(bombCoords, -1);

        return bombCoords;
    }

    _notifyNeighbours(bombCoords: Coordinates) {
        const neighbours = this._getNeighboursCoords(bombCoords);

        neighbours.forEach((neighbour) => {
            if (
                this._field.isExist(neighbour) &&
                !this._isCoordBomb(neighbour)
            ) {
                this._field.inc(neighbour);
            }
        });
    }

    _isCoordBomb(coords: Coordinates) {
        return this._field.getValue(coords) === -1;
    }

    _getNeighboursCoordPattern =
        (distance: number) =>
        (coords: Coordinates): Array<Coordinates> => {
            const pattern: Array<Coordinates> = new Array<Coordinates>();
            for (let i: number = -distance; i <= distance; i++) {
                for (let j: number = -distance; j <= distance; j++) {
                    if (i == 0 && j == 0) continue;
                    pattern.push({ x: i + coords.x, y: j + coords.y });
                }
            }
            return pattern;
        };
}
