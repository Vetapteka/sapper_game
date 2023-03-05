import { useRef } from 'react';
import GameLayout from './GameLayout';
import BombCounter, { BombCounterRef } from './BombCounter';
import Timer, { TimerRef } from './Timer';
import SmileButton, { SmileButtonRef } from './SmileButton';
import Tiles, { TilesRef } from './Tiles';
import gameSettings from '../../gameSettings';

export interface ClickHandles {
    handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleLeftClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleRightClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Game = () => {
    const timerRef = useRef<TimerRef>(null);
    const smileButtonRef = useRef<SmileButtonRef>(null);
    const bombCounterRef = useRef<BombCounterRef>(null);
    const tilesRef = useRef<TilesRef>(null);

    const isFirstClick = useRef(true);

    const isMouseDownRef = useRef(false);

    const handleMouseDown = () => {
        isMouseDownRef.current = true;
        smileButtonRef.current?.setRole('wonder');
    };

    const handleMouseUp = () => {
        isMouseDownRef.current = false;
        smileButtonRef.current?.setRole('default');
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const tile = tilesRef.current?.getTileByClick(event);

        if (tile && tile.isClosed() && bombCounterRef.current?.isBombsExist()) {
            const clickCountRef = tile.getRightClickCount();
            const clickCount = clickCountRef.current;
            if (clickCount == 0) {
                tile.setTileClosedRole('flag');
                clickCountRef.current++;
                bombCounterRef.current?.dec();
            } else if (clickCount == 1) {
                tile.setTileClosedRole('question');
                clickCountRef.current++;
            } else if (clickCount == 2) {
                tile.setTileClosedRole('empty');
                bombCounterRef.current?.inc();
                clickCountRef.current = 0;
            }
        }
    };

    const handleLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const tile = tilesRef.current?.getTileByClick(event);
        if (tile && tile.isLeftClicable()) {
            if (isFirstClick.current) {
                startGame(event);
                isFirstClick.current = false;
            }

            tilesRef.current?.openDependentTiles(tile);

            if (tile.isBomb()) {
                loseGame();
            }

            if (tilesRef.current?.isAllNoBombOpened()) winGame();
        }
    };

    const startGame = (event: React.MouseEvent<HTMLDivElement>) => {
        tilesRef.current?.initTiles(event);
        timerRef.current?.start();
    };

    const endGame = () => {
        timerRef.current?.stop();
    };

    const loseGame = () => {
        smileButtonRef.current?.setRole('sad');
        endGame();
    };

    const winGame = () => {
        smileButtonRef.current?.setRole('sunglasses');
        endGame();
    };

    const resetGame = () => {
        tilesRef.current?.resetTiles();
        isFirstClick.current = true;
        timerRef.current?.reset();
        smileButtonRef.current?.setRole('default');
        bombCounterRef.current?.reset();
    };

    const clickHandles: ClickHandles = {
        handleMouseDown,
        handleMouseUp,
        handleLeftClick,
        handleRightClick,
    };

    return (
        <GameLayout
            tiles={
                <Tiles
                    ref={tilesRef}
                    clickHandles={clickHandles}
                    fieldSettings={gameSettings}
                />
            }
            bombCounter={
                <BombCounter
                    ref={bombCounterRef}
                    initialBombCount={gameSettings.bombCount}
                />
            }
            timer={<Timer ref={timerRef} />}
            smileButton={
                <SmileButton ref={smileButtonRef} handleClick={resetGame} />
            }
        />
    );
};

export default Game;
