import { Coordinates } from './Coordinates';
import { MultipleArray, NumberMultipleArray } from './MultipleArray';
import { getRandomIndex } from './tools';

export class GameManager {
    private field: NumberMultipleArray;
    private bombCount: number;
    private bombCoordinates: Array<Coordinates>;
    private openedCoordinates: MultipleArray;
    private x: number;
    private y: number;
    private getNeighboursCoords: (
        coords: Coordinates | undefined
    ) => Array<Coordinates>;

    constructor(
        bombCount: number,
        x: number,
        y: number,
        neighbourRadius: number
    ) {
        this.bombCount = bombCount;
        this.bombCoordinates = new Array<Coordinates>();
        this.openedCoordinates = new MultipleArray(x, y, false);
        this.x = x;
        this.y = y;
        this.field = new NumberMultipleArray(x, y, 0);
        this.getNeighboursCoords =
            this.getNeighboursCoordPattern(neighbourRadius);
    }

    getField(): NumberMultipleArray {
        return this.field;
    }

    fillField(startCoords: Coordinates) {
        for (let i: number = 0; i < this.bombCount; i++) {
            const bombCoords = this.createBomb(startCoords);
            this.notifyNeighbours(bombCoords);
        }
    }

    getUnlockedCoords(tileCoord: Coordinates): Array<Coordinates> {
        if (this.isCoordBomb(tileCoord)) return this.bombCoordinates;

        const unlockedCoordinates = new Array<Coordinates>();
        const queue = new Array<Coordinates>();

        this.openedCoordinates.setValue(tileCoord, true);
        unlockedCoordinates.push(tileCoord);

        if (this.isCoordDigit(tileCoord)) {
            const neighbours = this.getNeighboursCoords(tileCoord);

            neighbours.forEach((neighbour) => {
                if (this.isCoordEmpty(neighbour)) {
                    this.openedCoordinates.setValue(neighbour, true);
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

            const neighbours = this.getNeighboursCoords(current);

            neighbours.forEach((neighbour) => {
                if (
                    !this.openedCoordinates.getValue(neighbour) &&
                    !this.isCoordBomb(neighbour)
                ) {
                    this.openedCoordinates.setValue(neighbour, true);
                    unlockedCoordinates.push(neighbour);
                    if (this.isCoordEmpty(neighbour)) queue.push(neighbour);
                }
            });
        }

        return unlockedCoordinates;
    }

    private createBomb(exclude: Coordinates): Coordinates {
        let bombCoords: Coordinates;
        do {
            bombCoords = {
                x: getRandomIndex(0, this.x),
                y: getRandomIndex(0, this.y),
            };
        } while (
            this.isCoordBomb(bombCoords) ||
            Coordinates.compare(bombCoords, exclude)
        );

        this.field.setValue(bombCoords, -1);
        this.bombCoordinates.push(bombCoords);

        return bombCoords;
    }

    private notifyNeighbours(bombCoords: Coordinates): void {
        const neighbours = this.getNeighboursCoords(bombCoords);

        neighbours.forEach((neighbour) => {
            if (!this.isCoordBomb(neighbour)) {
                this.field.inc(neighbour);
            }
        });
    }

    private isCoordBomb(coords: Coordinates): Boolean {
        return this.field.getValue(coords) === -1;
    }

    private isCoordDigit(coords: Coordinates): Boolean {
        return this.field.getValue(coords) > 0;
    }

    private isCoordEmpty(coords: Coordinates): Boolean {
        return this.field.getValue(coords) == 0;
    }

    private getNeighboursCoordPattern =
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
                        if (this.field.isExist(neighbour))
                            neighbours.push(neighbour);
                    }
                }
            }
            return neighbours;
        };
}
