import { forwardRef, useImperativeHandle, useRef } from 'react';
import Tile, { TileRef } from './Tile';
import styled from 'styled-components';
import { GameManager } from './tools/GameManager';
import { GameSettings } from '../../gameSettings';
import { ClickHandles } from './Game';

const Grid = styled.div`
    display: grid;
    margin: 0 auto;
    grid-template-columns: repeat(16, 30px);
    grid-template-rows: repeat(16, 30px);
`;

export interface TilesRef {
    initTiles: (event: React.MouseEvent<HTMLDivElement>) => void;
    resetTiles: () => void;
    openDependentTiles: (tile: TileRef) => void;
    getTileByClick: (event: React.MouseEvent<HTMLDivElement>) => TileRef;
    isAllNoBombOpened: () => boolean;
}

interface TilesProps {
    fieldSettings: GameSettings;
    clickHandles: ClickHandles;
}

const Tiles = forwardRef<TilesRef, TilesProps>(
    ({ clickHandles, fieldSettings }, ref) => {
        const tileRefs = useRef<Array<TileRef>>([]);
        const gameManager = new GameManager(fieldSettings);
        const field = gameManager.getField();
        const openedNoBombTilesRef = useRef<number>(0);

        const createTiles = () => {
            const tiles = [];
            for (
                let i: number = 0;
                i < fieldSettings.y * fieldSettings.x;
                i++
            ) {
                tiles.push(
                    <Tile
                        key={i}
                        ref={(el) => el && (tileRefs.current[i] = el)}
                        onLeftClick={clickHandles.handleLeftClick}
                        onRightClick={clickHandles.handleRightClick}
                        data={{
                            index: i,
                            openedRole: '0',
                            closedRole: 'empty',
                        }}
                    />
                );
            }
            return tiles;
        };

        const resetTiles = () => {
            gameManager.clearField();
            tileRefs.current.forEach((tile) => {
                tile.close();
                tile.setTileClosedRole('empty');
                tile.setTileOpenedRole('0');
            });
            openedNoBombTilesRef.current = 0;
        };

        const initTiles = (event: React.MouseEvent<HTMLDivElement>) => {
            const firstClickTileIndex = getTileIndexByClick(event);
            gameManager.fillField(
                field.getCoordsByLineCoords(firstClickTileIndex)
            );

            const filedLine = field.getValuesInLine();

            tileRefs.current.forEach((ref, index) => {
                ref?.setTileOpenedRole(filedLine[index]);
            });
        };

        const getTileIndexByClick = (
            event: React.MouseEvent<HTMLDivElement>
        ): number => {
            const target = event.target as HTMLDivElement;
            const index = target.dataset.index || '0';
            return +index;
        };

        const getTileByIndex = (index: number): TileRef => {
            return tileRefs.current[index];
        };

        const getTileByClick = (
            event: React.MouseEvent<HTMLDivElement>
        ): TileRef => {
            return getTileByIndex(getTileIndexByClick(event));
        };

        /* will open either empty nearby or bombs */
        const openDependentTiles = (tile: TileRef) => {
            const tileCoords = field.getCoordsByLineCoords(tile.getIndex());

            gameManager.getUnlockedCoords(tileCoords).forEach((coords) => {
                const index = field.getLineCoordsByCoords(coords);
                const tile = getTileByIndex(index);
                if (!tile.isBomb()) {
                    openedNoBombTilesRef.current++;
                    
                }
                tile.open();
            });
        };

        const tileCount = fieldSettings.x * fieldSettings.y;

        const isAllNoBombOpened = (): boolean =>
            openedNoBombTilesRef.current == tileCount - fieldSettings.bombCount;

        useImperativeHandle(ref, () => ({
            initTiles,
            resetTiles,
            openDependentTiles,
            getTileByClick,
            isAllNoBombOpened,
        }));

        return (
            <Grid
                onMouseDown={clickHandles.handleMouseDown}
                onMouseUp={clickHandles.handleMouseUp}
            >
                {createTiles()}
            </Grid>
        );
    }
);

export default Tiles;
