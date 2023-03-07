import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Tile, { TileRef } from './Tile';
import styled from 'styled-components';
import { GameManager } from './tools/GameManager';
import { GameSettings } from '../../gameSettings';
import { ClickHandles } from './Game';
import { TILE_SIZE_LARGE, TILE_SIZE_SMALL } from '../../styles/global';

interface GridProps {
    x: number;
    y: number;
}

const Grid = styled.div<GridProps>`
    display: grid;
    margin: 0 auto;
    grid-template-columns: repeat(${(props) => props.x}, ${TILE_SIZE_LARGE}px);
    grid-template-rows: repeat(${(props) => props.y}, ${TILE_SIZE_LARGE}px);

    @media ${(props) => props.theme.media.phone} {
        grid-template-columns: repeat(
            ${(props) => props.x},
            ${TILE_SIZE_SMALL}px
        );
        grid-template-rows: repeat(${(props) => props.y}, ${TILE_SIZE_SMALL}px);
    }
`;

export interface TilesRef {
    initTiles: (event: React.MouseEvent<HTMLDivElement>) => void;
    resetTiles: () => void;
    openDependentTiles: (tile: TileRef) => void;
    getTileByClick: (event: React.MouseEvent<HTMLDivElement>) => TileRef;
    isAllNoBombOpened: () => boolean;
    showErrors: () => void;
    saveFlag: (tile: TileRef) => void;
    removeFlag: (tile: TileRef) => void;
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
        const flags = new Set<TileRef>();

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
                tile.removeAccent();

                const clickCountRef = tile.getRightClickCount();
                clickCountRef.current = 0;
            });
            openedNoBombTilesRef.current = 0;
            flags.clear();
            console.log(flags);
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

        const showErrors = () => {
            flags.forEach((tile) => tile.setTileClosedRole('crossedFlag'));
        };

        const saveFlag = (tile: TileRef) => flags.add(tile);
        const removeFlag = (tile: TileRef) => flags.delete(tile);

        useImperativeHandle(ref, () => ({
            initTiles,
            resetTiles,
            openDependentTiles,
            getTileByClick,
            isAllNoBombOpened,
            showErrors,
            saveFlag,
            removeFlag,
        }));

        return (
            <Grid
                x={+fieldSettings.x}
                y={+fieldSettings.y}
                onMouseDown={clickHandles.handleMouseDown}
                onMouseUp={clickHandles.handleMouseUp}
            >
                {createTiles()}
            </Grid>
        );
    }
);

export default Tiles;
