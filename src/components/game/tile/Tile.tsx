import { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    width: 30px;
    height: 30px;
`;

const Closed = styled.div`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    border: 4px solid;
    border-top-color: #f8f8f8;
    border-left-color: #f8f8f8;
    border-right-color: #7b7b7b;
    border-bottom-color: #7b7b7b;
`;

const Open = styled.div`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    border: 1px solid #7b7b7b;
`;

export interface TileProps {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    index: number;
}

export interface TileRef {
    handleOpen: () => void;
}

const Tile = forwardRef<TileRef, TileProps>(({ onClick, index }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onClick(event);
    };

    useImperativeHandle(ref, () => ({
        handleOpen: () => {
            setIsOpen(true);
        },
    }));

    return (
        <Content onClick={handleClick}>
            {isOpen ? (
                <Open data-index={index} />
            ) : (
                <Closed data-index={index} />
            )}
        </Content>
    );
});

export default Tile;
