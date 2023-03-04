import { useRef } from 'react';
import Tile, { TileRef } from './Tile';
import { GameField } from './tools/GameField';
import styled from 'styled-components';
import { MultipleArray } from './tools/MultipleArray';

const x = 16;
const y = 16;
const bombCount = 40;
const bombRadius = 1;

let isFirstClick = true;

const Grid = styled.div`
    display: grid;
    margin: 0 auto;
    grid-template-columns: repeat(16, 30px);
    grid-template-rows: repeat(16, 30px);
`;

const Game = () => {
    const tileRefs = useRef<Array<TileRef>>([]);
    const gameField = new GameField(bombCount, x, y, bombRadius);

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

        const tile = getTileByIndex(getTileIndexByClick(event));
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
        const tileIndex = getTileIndexByClick(event);

        if (isFirstClick) {
            initTiles(tileIndex);
            isFirstClick = false;
        }

        const tile = getTileByIndex(tileIndex);

        const tileCoord = MultipleArray.getCoordsByLineCoords(
            tile.getIndex(),
            x
        );

        const openedCoords = gameField.getUnlockedCoords(tileCoord);

        openedCoords.forEach((coords) => {
            const index = MultipleArray.getLineCoordsByCoords(coords, x);
            tileRefs.current[index].open();
        });
    };

    const getTileIndexByClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const index = target.dataset.index || '0';
        return +index;
    };

    const getTileByIndex = (index: number): TileRef => {
        return tileRefs.current[index];
    };

    const initTiles = (firstClickTileIndex: number) => {
        gameField.fillField(
            MultipleArray.getCoordsByLineCoords(firstClickTileIndex, x)
        );

        const field = gameField.field;
        const filedLine = field.getValuesInLine();

        tileRefs.current.forEach((ref, index) => {
            ref?.setTileOpenedRole(filedLine[index]);
        });
    };

    return <Grid>{createTiles()}</Grid>;
};

export default Game;
