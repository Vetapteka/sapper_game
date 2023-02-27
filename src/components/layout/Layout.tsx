import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { Main } from './Main';

interface Props {
    children?: ReactNode;
}

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Layout = ({ children }: Props) => {
    return (
        <Wrapper>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </Wrapper>
    );
};

export default Layout;
