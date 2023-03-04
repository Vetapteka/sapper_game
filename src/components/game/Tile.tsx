import { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import mineImage from '../../../assets/mine.png';
import oneNumber from '../../../assets/1.png';
import twoNumber from '../../../assets/2.png';
import threeNumber from '../../../assets/3.png';
import fourNumber from '../../../assets/4.png';
import fiveNumber from '../../../assets/5.png';
import sixNumber from '../../../assets/6.png';
import sevenNumber from '../../../assets/7.png';
import empty from '../../../assets/7.png';


type TileRoleType = keyof typeof TileRole;

export const TileRole = {
    '0': empty,
    '-1': mineImage,
    '1': oneNumber,
    '2': twoNumber,
    '3': threeNumber,
    '4': fourNumber,
    '5': fiveNumber,
    '6': sixNumber,
    '7': sevenNumber,
};

const Content = styled.div`
    width: 30px;
    height: 30px;
`;

const Closed = styled.div<OpenProps>`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    border: 4px solid;
    border-top-color: #f8f8f8;
    border-left-color: #f8f8f8;
    border-right-color: #7b7b7b;
    border-bottom-color: #7b7b7b;
`;

interface OpenProps {
    role: TileRoleType;
}

const Open = styled.div<OpenProps>`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    border: 1px solid #7b7b7b;
    background-image: url(${(props) => TileRole[props.role]});
    background-repeat: no-repeat;
    background-size: 100%;
`;

interface TileProps {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    data: TileData;
}

export interface TileData {
    role: TileRoleType;
    index: number;
}

export interface TileRef {
    handleOpen: () => void;
    setTileRole: (role: TileRoleType) => void;
}

const Tile = forwardRef<TileRef, TileProps>(({ onClick, data }, ref) => {
    const [isOpen, setIsOpen] = useState(true);
    const [role, setRole] = useState<TileRoleType>(data.role);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onClick(event);
    };

    useImperativeHandle(ref, () => ({
        handleOpen: () => {
            setIsOpen(true);
        },

        setTileRole: (role) => {
            setRole(role);
        },
    }));

    return (
        <Content onClick={handleClick}>
            {isOpen ? (
                <Open data-index={data.index} role={role} />
            ) : (
                <Closed data-index={data.index} role={role} />
            )}
        </Content>
    );
});

export default Tile;
