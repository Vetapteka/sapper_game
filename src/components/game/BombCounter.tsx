import { useState } from 'react';

interface BombCouterProps {
    bombCount: number;
}

const BombCounter = ({ bombCount }: BombCouterProps) => {
    return <div>{bombCount}</div>;
};

export default BombCounter;
