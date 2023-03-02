import { ReactNode } from 'react';
import styled from 'styled-components';
import { Container } from './Container';

const StyledMain = styled.main`
    flex-grow: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = {
    children?: ReactNode;
};

const Main = ({ children }: Props) => {
    return (
        <StyledMain>
            <Container>{children}</Container>
        </StyledMain>
    );
};

export default Main;
