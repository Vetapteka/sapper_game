import styled from 'styled-components';
import { Container } from './Container';

const Content = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Header = () => {
    return (
        <header>
            <Container>
                <Content>
                    <h1>SAPER</h1>
                    <button>change theme</button>
                </Content>
            </Container>
        </header>
    );
};

export default Header;
