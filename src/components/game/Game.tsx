import { useRef } from 'react';
import Tile, { TileRef } from './Tile';
import { GameField } from './tools/GameField';

const x = 16;
const y = 16;
const bombCount = 40;
const bombRadius = 1;

let isFirstClick = true;

const Game = () => {
    const tileRefs = useRef<Array<TileRef>>([]);

    const createTiles = () => {
        const tiles = [];
        for (let i: number = 0; i < y * x; i++) {
            tiles.push(
                <Tile
                    key={i}
                    ref={(el) => el && (tileRefs.current[i] = el)}
                    onLeftClick={handleLeftClick}
                    onRightClick={handleRightClick}
                    data={{ index: i, openedRole: '0', closedRole: 'empty' }}
                />
            );
        }
        return tiles;
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const tile = getTileByClick(event);
        const clickCounter = tile.getRightClickCount();
        const clickCount = clickCounter.current;

        if (clickCount == 0) {
            tile.setTileClosedRole('flag');
            clickCounter.current++;
        } else if (clickCount == 1) {
            tile.setTileClosedRole('question');
            clickCounter.current++;
        } else if (clickCount == 2) {
            tile.setTileClosedRole('empty');
            clickCounter.current = 0;
        }
    };

    const handleLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isFirstClick) {
            initTiles();
            isFirstClick = false;
        }

        getTileByClick(event)?.open();
    };

    const getTileByClick = (
        event: React.MouseEvent<HTMLDivElement>
    ): TileRef => {
        const target = event.target as HTMLDivElement;
        const index = target.dataset.index || '0';

        return tileRefs.current[+index];
    };

    const initTiles = () => {
        const gameField = new GameField(bombCount, x, y, bombRadius);
        gameField.fillField();
        const field = gameField.field;

        const filedLine = field.getValuesInLine();

        tileRefs.current.forEach((ref, index) => {
            ref?.setTileOpenedRole(filedLine[index]);
        });
    };

    return <>{createTiles()}</>;
};

export default Game;
