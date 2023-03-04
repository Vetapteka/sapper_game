import Game from './Game';
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    margin: 0 auto;
    grid-template-columns: repeat(16, 30px);
    grid-template-rows: repeat(16, 30px);
`;

const GameLayout = () => {
    return (
        <Grid>
            <Game />
        </Grid>
    );
};

export default GameLayout;
