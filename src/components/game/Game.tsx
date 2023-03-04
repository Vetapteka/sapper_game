import { useRef } from 'react';
import Tile, { TileRef } from './Tile';
import { GameManager } from './tools/GameManager';
import styled from 'styled-components';

const x = 16;
const y = 16;
const bombCount = 40;
const bombRadius = 1;

const Grid = styled.div`
    display: grid;
    margin: 0 auto;
    grid-template-columns: repeat(16, 30px);
    grid-template-rows: repeat(16, 30px);
`;

const Game = () => {
    const isFirstClick = useRef(true);
    const tileRefs = useRef<Array<TileRef>>([]);
    const gameManager = new GameManager(bombCount, x, y, bombRadius);
    const field = gameManager.getField();

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
        const clickCountRef = tile.getRightClickCount();
        const clickCount = clickCountRef.current;

        if (clickCount == 0) {
            tile.setTileClosedRole('flag');
            clickCountRef.current++;
        } else if (clickCount == 1) {
            tile.setTileClosedRole('question');
            clickCountRef.current++;
        } else if (clickCount == 2) {
            tile.setTileClosedRole('empty');
            clickCountRef.current = 0;
        }
    };

    const handleLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const tileIndex = getTileIndexByClick(event);

        if (isFirstClick.current) {
            initTiles(tileIndex);
            isFirstClick.current = false;
        }

        const tile = getTileByIndex(tileIndex);
        const tileCoords = field.getCoordsByLineCoords(tile.getIndex());

        gameManager.getUnlockedCoords(tileCoords).forEach((coords) => {
            const index = field.getLineCoordsByCoords(coords);
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
        gameManager.fillField(field.getCoordsByLineCoords(firstClickTileIndex));

        const filedLine = field.getValuesInLine();

        tileRefs.current.forEach((ref, index) => {
            ref?.setTileOpenedRole(filedLine[index]);
        });
    };

    return <Grid>{createTiles()}</Grid>;
};

export default Game;
