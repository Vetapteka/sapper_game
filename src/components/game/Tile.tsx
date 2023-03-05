import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import mineImage from '../../assets/oldTheme/mine.svg';
import oneNumber from '../../assets/oldTheme/field/type1.svg';
import twoNumber from '../../assets/oldTheme/field/type2.svg';
import threeNumber from '../../assets/oldTheme/field/type3.svg';
import fourNumber from '../../assets/oldTheme/field/type4.svg';
import fiveNumber from '../../assets/oldTheme/field/type5.svg';
import sixNumber from '../../assets/oldTheme/field/type6.svg';
import sevenNumber from '../../assets/oldTheme/field/type7.svg';
import eightNumber from '../../assets/oldTheme/field/type7.svg';
import flag from '../../assets/oldTheme/flag.svg';
import question from '../../assets/oldTheme/question.svg';
import { TILE_SIZE_LARGE, TILE_SIZE_SMALL } from '../../styles/global';

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
    '8': eightNumber,
};

export const TileClosedRole = {
    question: question,
    flag: flag,
    empty: null,
};

const Content = styled.div`
    width: ${TILE_SIZE_LARGE};
    height: ${TILE_SIZE_LARGE};

    @media ${(props) => props.theme.media.phone} {
        height: ${TILE_SIZE_SMALL};
        width: ${TILE_SIZE_SMALL};
    }
`;

const Closed = styled.div<ClosedProps>`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    border: 4px solid;
    border-top-color: ${(props) => props.theme.colors.accent};
    border-left-color: ${(props) => props.theme.colors.accent};
    border-right-color: ${(props) => props.theme.colors.secondary};
    border-bottom-color: ${(props) => props.theme.colors.secondary};

    background-image: url(${(props) => TileClosedRole[props.closedRole]});
    background-repeat: no-repeat;
    background-size: 100%;

    @media ${(props) => props.theme.media.phone} {
        border: 3px solid;
        border-top-color: ${(props) => props.theme.colors.accent};
        border-left-color: ${(props) => props.theme.colors.accent};
        border-right-color: ${(props) => props.theme.colors.secondary};
        border-bottom-color: ${(props) => props.theme.colors.secondary};
    }
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
    close: () => void;
    isOpened: () => boolean;
    isClosed: () => boolean;
    isLeftClicable: () => boolean;
    isBomb: () => boolean;
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
            isClosed: () => !isOpened,
            isBomb: () => openedRole == '-1',

            isLeftClicable: () => closedRole === 'empty',

            open: () => setIsOpened(true),
            close: () => setIsOpened(false),

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
