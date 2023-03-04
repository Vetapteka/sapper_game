import { useRef, useState } from 'react';
import Tile, { TileRef } from './Tile';
import { GameManager } from './tools/GameManager';
import styled from 'styled-components';
import GameLayout from './GameLayout';
import BombCounter from './BombCounter';
import Timer, { TimerRef } from './Timer';
import SmileButton, { SmileButtonRef } from './SmileButton';

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
    const timerRef = useRef<TimerRef>(null);
    const smileButtonRef = useRef<SmileButtonRef>(null);

    const isMouseDownRef = useRef(false);

    const handleMouseDown = () => {
        isMouseDownRef.current = true;
        smileButtonRef.current?.setRole('wonder');
    };

    const handleMouseUp = () => {
        isMouseDownRef.current = false;
        smileButtonRef.current?.setRole('default');
    };

    const isFirstClick = useRef(true);
    const tileRefs = useRef<Array<TileRef>>([]);
    const gameManager = new GameManager(bombCount, x, y, bombRadius);
    const field = gameManager.getField();

    const [flagsCount, setFlagsCount] = useState(bombCount);

    const startGame = (tileIndex: number) => {
        initTiles(tileIndex);
        timerRef.current?.start();
        isFirstClick.current = false;
    };

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

        if (!tile.isOpened()) {
            const clickCountRef = tile.getRightClickCount();
            const clickCount = clickCountRef.current;

            if (clickCount == 0) {
                tile.setTileClosedRole('flag');
                clickCountRef.current++;
                setFlagsCount((prev) => prev - 1);
            } else if (clickCount == 1) {
                tile.setTileClosedRole('question');
                clickCountRef.current++;
            } else if (clickCount == 2) {
                tile.setTileClosedRole('empty');
                setFlagsCount((prev) => prev + 1);
                clickCountRef.current = 0;
            }
        }
    };

    const handleLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const tileIndex = getTileIndexByClick(event);

        if (isFirstClick.current) {
            startGame(tileIndex);
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

    return (
        <GameLayout
            game={
                <Grid onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                    {createTiles()}
                </Grid>
            }
            bombCounter={<BombCounter bombCount={flagsCount} />}
            timer={<Timer ref={timerRef} />}
            smileButton={<SmileButton ref={smileButtonRef} />}
        />
    );
};

export default Game;
