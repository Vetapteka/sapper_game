import { ReactNode } from 'react';
import styled from 'styled-components';
import { TILE_SIZE_LARGE, TILE_SIZE_SMALL } from '../../styles/global';
import {
    InnerBorderContainer,
    OuterBorderContainer,
} from '../styled components/BorderContainer';

const Content = styled.div`
    background-color: ${(props) => props.theme.colors.primary};
    padding: ${TILE_SIZE_LARGE / 2}px;

    @media ${(props) => props.theme.media.phone} {
        padding: ${TILE_SIZE_SMALL / 2}px;
    }
`;

const DigitContainer = styled.div`
    width: ${TILE_SIZE_LARGE * 3}px;
    height: ${TILE_SIZE_LARGE * 2}px;

    @media ${(props) => props.theme.media.phone} {
        width: ${TILE_SIZE_SMALL * 3}px;
        height: ${TILE_SIZE_SMALL * 2}px;
    }
`;

const PanelContainer = styled.div`
    margin-bottom: ${TILE_SIZE_LARGE / 2}px;

    @media ${(props) => props.theme.media.phone} {
        margin-bottom: ${TILE_SIZE_SMALL / 2}px;
    }
`;

const Panel = styled.div`
    background-color: ${(props) => props.theme.colors.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${TILE_SIZE_LARGE / 3}px;

    @media ${(props) => props.theme.media.phone} {
        padding: ${TILE_SIZE_SMALL / 3}px;
    }
`;

const PanelElementContainer = styled.div`
    width: ${TILE_SIZE_LARGE * 2}px;
    height: ${TILE_SIZE_LARGE * 2}px;

    @media ${(props) => props.theme.media.phone} {
        width: ${TILE_SIZE_SMALL * 2}px;
        height: ${TILE_SIZE_SMALL * 2}px;
    }
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
        <OuterBorderContainer>
            <Content>
                <PanelContainer>
                    <InnerBorderContainer>
                        <Panel>
                            <DigitContainer>{bombCounter}</DigitContainer>
                            <PanelElementContainer>
                                <OuterBorderContainer>
                                    {smileButton}
                                </OuterBorderContainer>
                            </PanelElementContainer>
                            <DigitContainer>{timer}</DigitContainer>
                        </Panel>
                    </InnerBorderContainer>
                </PanelContainer>

                <InnerBorderContainer>{tiles}</InnerBorderContainer>
            </Content>
        </OuterBorderContainer>
    );
};

export default GameLayout;
