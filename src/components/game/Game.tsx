import { useRef } from 'react';
import Tile, { TileRef } from './Tile';
import { GameField } from './tools/GameField';

const x = 16;
const y = 16;
const bombCount = 40;
const bombRadius = 1;

let isFirstClick = true;

const Game = () => {
    const tileRefs = useRef<Array<TileRef | null>>([]);

    const createTiles = () => {
        const tiles = [];
        for (let i: number = 0; i < y * x; i++) {
            tiles.push(
                <Tile
                    key={i}
                    ref={(el) => (tileRefs.current[i] = el)}
                    onLeftClick={handleLeftClick}
                    onRightClick={handleRightClick}
                    data={{ index: i, role: '0' }}
                />
            );
        }
        return tiles;
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isFirstClick) {
            initTiles();
            isFirstClick = false;
        }

        const tile = getTileByClick(event);
        tile?.handleOpen();
    };

    const getTileByClick = (
        event: React.MouseEvent<HTMLDivElement>
    ): null | TileRef => {
        const target = event.target as HTMLDivElement;
        const index = target.dataset.index;
        return typeof index !== 'undefined' ? tileRefs.current[+index] : null;
    };

    const initTiles = () => {
        const gameField = new GameField(bombCount, x, y, bombRadius);
        gameField.fillField();
        const field = gameField.field;

        const filedLine = field.getValuesInLine();

        tileRefs.current.forEach((ref, index) => {
            ref?.setTileRole(filedLine[index]);
        });
    };

    return <>{createTiles()}</>;
};

export default Game;
