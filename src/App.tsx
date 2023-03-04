import Layout from './components/layout/Layout';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import future from './styles/themes/future';
import GameLayout from './components/game/GameLayout';

const App = () => {
    return (
        <ThemeProvider theme={future}>
            <GlobalStyle />
            <Layout>
                <GameLayout />
            </Layout>
        </ThemeProvider>
    );
};

export default App;
