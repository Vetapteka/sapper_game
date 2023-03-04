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
    game: ReactNode;
    bombCounter: ReactNode;
    smileButton: ReactNode;
    timer: ReactNode;
}

const GameLayout = ({
    game,
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
            {game}
        </Content>
    );
};

export default GameLayout;
