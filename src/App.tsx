import Layout from './components/layout/Layout';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import future from './styles/themes/future';
import Game from './components/game/Game';

const App = () => {
    return (
        <ThemeProvider theme={future}>
            <GlobalStyle />
            <Layout>
                <Game />
            </Layout>
        </ThemeProvider>
    );
};

export default App;
