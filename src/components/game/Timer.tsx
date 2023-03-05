import { useState, useImperativeHandle, forwardRef } from 'react';

export interface TimerRef {
    start: () => void;
    stop: () => void;
    reset: () => void;
}

const Timer = forwardRef<TimerRef>((props, ref) => {
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const reset = () => {
        stop();
        setTime(0);
    };

    const start = () => {
        if (!intervalId) {
            const newIntervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            setIntervalId(newIntervalId);
        }
    };

    const stop = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    useImperativeHandle(ref, () => ({
        start,
        stop,
        reset,
    }));

    return <div>{time}</div>;
});

export default Timer;
