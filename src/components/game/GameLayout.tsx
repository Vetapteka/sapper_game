import { ReactNode } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    border: 4px solid;
    border-top-color: #f8f8f8;
    border-left-color: #f8f8f8;
    border-right-color: #7b7b7b;
    border-bottom-color: #7b7b7b;

    background-color: lightgray;
    padding: 20px;
`;

const InnerBorderContainer = styled.div`
    border: 4px solid;
    border-top-color: #7b7b7b;
    border-left-color: #7b7b7b;
    border-right-color: #f8f8f8;
    border-bottom-color: #f8f8f8;
`;

const DigitContainer = styled.div`
    width: 90px;
    height: 60px;
`;

const PanelContainer = styled.div`
    margin-bottom: 20px;
`;

const Panel = styled.div`
    background-color: lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
            <PanelContainer>
                <InnerBorderContainer>
                    <Panel>
                        <DigitContainer>{bombCounter}</DigitContainer>
                        {smileButton}
                        <DigitContainer>{timer}</DigitContainer>
                    </Panel>
                </InnerBorderContainer>
            </PanelContainer>

            <InnerBorderContainer>{tiles}</InnerBorderContainer>
        </Content>
    );
};

export default GameLayout;
