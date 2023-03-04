import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Comfortaa', sans-serif;
  background-color: ${(props) => props.theme.colors.background};
  &::selection{
    background-color: red;
  }
}`;