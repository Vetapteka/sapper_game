import Game from './Game';
import styled from 'styled-components';
import BombCounter from './BombCounter';
import SmileButton from './SmileButton';
import Timer from './Timer';

const Content = styled.div`
    background-color: antiquewhite;
`;

const Panel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const GameLayout = () => {
    return (
        <Content>
            <Panel>
                <BombCounter />
                <SmileButton />
                <Timer />
            </Panel>
            <Game />
        </Content>
    );
};

export default GameLayout;
