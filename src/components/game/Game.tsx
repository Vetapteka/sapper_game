import { useRef } from 'react';
import Tile, { TileRef } from './tile/Tile';

const x = 16;
const y = 16;

const Game = () => {
    const tileRefs = useRef<Array<TileRef | null>>([]);

    const createTiles = () => {
        const tiles = [];
        for (let i: number = 0; i < y * x; i++) {
            tiles.push(
                <Tile
                    key={i}
                    ref={(el) => (tileRefs.current[i] = el)}
                    onClick={handleTileClick}
                    index={i}
                />
            );
        }
        return tiles;
    };

    const handleTileClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const index = target.dataset.index;
        console.log(index);

        if (typeof index !== 'undefined') {
            tileRefs.current[+index]?.handleOpen();
        }
    };

    return <>{createTiles()}</>;
};

export default Game;
