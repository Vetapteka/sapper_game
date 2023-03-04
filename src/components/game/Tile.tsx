import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import mineImage from '../../assets/mine.png';
import oneNumber from '../../assets/1.png';
import twoNumber from '../../assets/2.png';
import threeNumber from '../../assets/3.png';
import fourNumber from '../../assets/4.png';
import fiveNumber from '../../assets/5.png';
import sixNumber from '../../assets/6.png';
import sevenNumber from '../../assets/7.png';
import flag from '../../assets/flag.png';
import question from '../../assets/question.png';

type TileOpenedRoleType = keyof typeof TileOpenedRole;
type TileClosedRoleType = keyof typeof TileClosedRole;

export const TileOpenedRole = {
    '0': null,
    '-1': mineImage,
    '1': oneNumber,
    '2': twoNumber,
    '3': threeNumber,
    '4': fourNumber,
    '5': fiveNumber,
    '6': sixNumber,
    '7': sevenNumber,
};

export const TileClosedRole = {
    question: question,
    flag: flag,
    empty: null,
};

const Content = styled.div`
    width: 30px;
    height: 30px;
`;

const Closed = styled.div<ClosedProps>`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    border: 4px solid;
    border-top-color: #f8f8f8;
    border-left-color: #f8f8f8;
    border-right-color: #7b7b7b;
    border-bottom-color: #7b7b7b;

    background-image: url(${(props) => TileClosedRole[props.closedRole]});
    background-repeat: no-repeat;
    background-size: 100%;
`;

interface ClosedProps {
    closedRole: TileClosedRoleType;
}

interface OpenedProps {
    openedRole: TileOpenedRoleType;
}

const Open = styled.div<OpenedProps>`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    border: 1px solid #7b7b7b;
    background-image: url(${(props) => TileOpenedRole[props.openedRole]});
    background-repeat: no-repeat;
    background-size: 100%;
`;

interface TileProps {
    onLeftClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    onRightClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    data: TileData;
}

export interface TileData {
    openedRole: TileOpenedRoleType;
    closedRole: TileClosedRoleType;
    index: number;
}

export interface TileRef {
    open: () => void;
    isOpened: () => boolean;
    getIndex: () => number;
    getRightClickCount: () => React.MutableRefObject<number>;

    setTileOpenedRole: (role: TileOpenedRoleType) => void;
    setTileClosedRole: (role: TileClosedRoleType) => void;
}

const Tile = forwardRef<TileRef, TileProps>(
    ({ onLeftClick, onRightClick, data }, ref) => {
        const [isOpened, setIsOpened] = useState(false);
        const [openedRole, setOpenedRole] = useState<TileOpenedRoleType>(
            data.openedRole
        );
        const [closedRole, setClosedRole] = useState<TileClosedRoleType>(
            data.closedRole
        );

        const rightClickCount = useRef(0);

        useImperativeHandle(ref, () => ({
            getIndex: () => data.index,

            isOpened: () => isOpened,

            open: () => setIsOpened(true),

            getRightClickCount: () => rightClickCount,

            setTileOpenedRole: (role) => setOpenedRole(role),
            setTileClosedRole: (role) => setClosedRole(role),
        }));

        return (
            <Content onClick={onLeftClick} onContextMenu={onRightClick}>
                {isOpened ? (
                    <Open data-index={data.index} openedRole={openedRole} />
                ) : (
                    <Closed data-index={data.index} closedRole={closedRole} />
                )}
            </Content>
        );
    }
);

export default Tile;
