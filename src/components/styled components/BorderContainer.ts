import styled from 'styled-components';

export const OuterBorderContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 4px solid;
    border-top-color: ${(props) => props.theme.colors.accent};
    border-left-color: ${(props) => props.theme.colors.accent};
    border-right-color: ${(props) => props.theme.colors.secondary};
    border-bottom-color: ${(props) => props.theme.colors.secondary};
`;

export const InnerBorderContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 4px solid;
    border-top-color: ${(props) => props.theme.colors.secondary};
    border-left-color: ${(props) => props.theme.colors.secondary};
    border-right-color: ${(props) => props.theme.colors.accent};
    border-bottom-color: ${(props) => props.theme.colors.accent};
`;
