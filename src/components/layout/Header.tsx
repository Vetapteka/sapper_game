import styled from 'styled-components';
import { Container } from './Container';

const Content = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Header: React.FC = () => {
    return (
        <header>
            <Container>
                <Content>
                    <h1>SAPPER</h1>
                    <button>change theme</button>
                </Content>
            </Container>
        </header>
    );
};

export default Header;
