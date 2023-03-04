import { Coordinates } from './Coordinates';
import { MultipleArray, NumberMultipleArray } from './MultipleArray';
import { getRandomIndex } from './tools';

export class GameField {
    _field: NumberMultipleArray;
    _bombCount: number;
    _bombCoordinates: Array<Coordinates>;
    _openedCoordinates: MultipleArray;
    _x: number;
    _y: number;
    _getNeighboursCoords: (
        coords: Coordinates | undefined
    ) => Array<Coordinates>;

    constructor(
        bombCount: number,
        x: number,
        y: number,
        neighbourRadius: number
    ) {
        this._bombCount = bombCount;
        this._bombCoordinates = new Array<Coordinates>();
        this._openedCoordinates = new MultipleArray(x, y, false);
        this._x = x;
        this._y = y;
        this._field = new NumberMultipleArray(x, y, 0);
        this._getNeighboursCoords =
            this._getNeighboursCoordPattern(neighbourRadius);
    }

    get field(): NumberMultipleArray {
        return this._field;
    }

    fillField(startCoords: Coordinates) {
        for (let i: number = 0; i < this._bombCount; i++) {
            const bombCoords = this._createBomb(startCoords);
            this._notifyNeighbours(bombCoords);
        }
    }

    getUnlockedCoords(tileCoord: Coordinates): Array<Coordinates> {
        if (this._isCoordBomb(tileCoord)) return this._bombCoordinates;

        const unlockedCoordinates = new Array<Coordinates>();
        const queue = new Array<Coordinates>();

        this._openedCoordinates.setValue(tileCoord, true);
        unlockedCoordinates.push(tileCoord);

        //if it's a digit find 0 near
        if (this._isCoordDigit(tileCoord)) {
            const neighbours = this._getNeighboursCoords(tileCoord);

            neighbours.forEach((neighbour) => {
                if (this._isCoordEmpty(neighbour)) {
                    this._openedCoordinates.setValue(neighbour, true);
                    queue.push(neighbour);
                    unlockedCoordinates.push(neighbour);
                }
            });
        } else {
            queue.push(tileCoord);
        }

        // bfs
        while (queue.length !== 0) {
            const current = queue.shift();

            const neighbours = this._getNeighboursCoords(current);

            neighbours.forEach((neighbour) => {
                if (
                    !this._openedCoordinates.getValue(neighbour) &&
                    !this._isCoordBomb(neighbour)
                ) {
                    this._openedCoordinates.setValue(neighbour, true);
                    unlockedCoordinates.push(neighbour);
                    if (this._isCoordEmpty(neighbour)) queue.push(neighbour);
                }
            });
        }

        return unlockedCoordinates;
    }

    _createBomb(exclude: Coordinates): Coordinates {
        let bombCoords: Coordinates;
        do {
            bombCoords = {
                x: getRandomIndex(0, this._x),
                y: getRandomIndex(0, this._y),
            };
        } while (
            this._isCoordBomb(bombCoords) ||
            Coordinates.compare(bombCoords, exclude)
        );

        this._field.setValue(bombCoords, -1);
        this._bombCoordinates.push(bombCoords);

        return bombCoords;
    }

    _notifyNeighbours(bombCoords: Coordinates): void {
        const neighbours = this._getNeighboursCoords(bombCoords);

        neighbours.forEach((neighbour) => {
            if (!this._isCoordBomb(neighbour)) {
                this._field.inc(neighbour);
            }
        });
    }

    _isCoordBomb(coords: Coordinates): Boolean {
        return this._field.getValue(coords) === -1;
    }

    _isCoordDigit(coords: Coordinates): Boolean {
        return this._field.getValue(coords) > 0;
    }

    _isCoordEmpty(coords: Coordinates): Boolean {
        return this._field.getValue(coords) == 0;
    }

    _getNeighboursCoordPattern =
        (distance: number) =>
        (coords: Coordinates | undefined): Array<Coordinates> => {
            const neighbours: Array<Coordinates> = new Array<Coordinates>();
            if (coords) {
                for (let i: number = -distance; i <= distance; i++) {
                    for (let j: number = -distance; j <= distance; j++) {
                        if (i == 0 && j == 0) continue;
                        const neighbour = new Coordinates(
                            i + coords.x,
                            j + coords.y
                        );
                        if (this._field.isExist(neighbour))
                            neighbours.push(neighbour);
                    }
                }
            }
            return neighbours;
        };
}
