import React from 'react';
import { Container } from './Container';
import styled from 'styled-components';
import { CODE_URL, GIT_URL } from '../../global';

const StyledFooter = styled.footer`
    flex-grow: 0;
`;

const Content = styled.div`
    display: flex;
    padding: 10px;
    border-radius: 10px;
    justify-content: space-around;
    color: black;
`;

const Link = styled.a`
    color: inherit;
`;
const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <Container>
                <Content>
                    <Link href={CODE_URL} target='_blank'>
                        source code
                    </Link>
                    <p>{new Date().getFullYear()}</p>
                    <Link href={GIT_URL} target='_blank'>
                        about me
                    </Link>
                </Content>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
