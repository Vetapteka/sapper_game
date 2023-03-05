import { forwardRef, useState, useImperativeHandle } from 'react';

interface BombCounterProps {
    initialBombCount: number;
}

export interface BombCounterRef {
    inc: () => void;
    dec: () => void;
    reset: () => void;
}

const BombCounter = forwardRef<BombCounterRef, BombCounterProps>(
    ({ initialBombCount }, ref) => {
        const [bombCount, setBombCount] = useState(initialBombCount);

        useImperativeHandle(ref, () => ({
            inc: () => setBombCount((prev) => prev + 1),
            dec: () => setBombCount((prev) => prev - 1),
            reset: () => setBombCount(initialBombCount),
        }));

        return <div>{bombCount}</div>;
    }
);

export default BombCounter;
