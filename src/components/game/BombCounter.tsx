import { forwardRef, useState, useImperativeHandle } from 'react';
import DigitProvider from './DigitProvider';

interface BombCounterProps {
    initialBombCount: number;
}

export interface BombCounterRef {
    inc: () => void;
    dec: () => void;
    reset: () => void;
    getBombCount: () => number;
}

const BombCounter = forwardRef<BombCounterRef, BombCounterProps>(
    ({ initialBombCount }, ref) => {
        const [bombCount, setBombCount] = useState(initialBombCount);

        useImperativeHandle(ref, () => ({
            inc: () => setBombCount((prev) => prev + 1),
            dec: () => setBombCount((prev) => prev - 1),
            reset: () => setBombCount(initialBombCount),
            getBombCount: () => bombCount,
        }));

        return <DigitProvider value={bombCount} />;
    }
);

export default BombCounter;
