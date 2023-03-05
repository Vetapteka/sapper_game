import { ReactNode } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    background-color: antiquewhite;
`;

const Panel = styled.div`
    display: flex;
    justify-content: space-between;
`;

interface GameLayoutProps {
    tiles: ReactNode;
    bombCounter: ReactNode;
    smileButton: ReactNode;
    timer: ReactNode;
}

const GameLayout = ({
    tiles: tiles,
    bombCounter,
    smileButton,
    timer,
}: GameLayoutProps) => {
    return (
        <Content>
            <Panel>
                {bombCounter}
                {smileButton}
                {timer}
            </Panel>
            {tiles}
        </Content>
    );
};

export default GameLayout;
