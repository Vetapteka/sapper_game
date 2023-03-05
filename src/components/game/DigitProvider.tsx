import styled from 'styled-components';
import zeroDigit from '../../assets/oldTheme/digits/d0.svg';
import oneDigit from '../../assets/oldTheme/digits/d1.svg';
import twoDigit from '../../assets/oldTheme/digits/d2.svg';
import threeDigit from '../../assets/oldTheme/digits/d3.svg';
import fourDigit from '../../assets/oldTheme/digits/d4.svg';
import fiveDigit from '../../assets/oldTheme/digits/d5.svg';
import sixDigit from '../../assets/oldTheme/digits/d6.svg';
import sevenDigit from '../../assets/oldTheme/digits/d7.svg';
import eightDigit from '../../assets/oldTheme/digits/d8.svg';
import nineDigit from '../../assets/oldTheme/digits/d9.svg';

const Conteiner = styled.div`
    width: 300px;
    height: 200px;
    display: flex;
    background-color: black;
    justify-content: space-evenly;
    align-items: center;
`;

interface DigitImages {
    [key: number]: string;
}

const digitImages : DigitImages = {
    0: zeroDigit,
    1: oneDigit,
    2: twoDigit,
    3: threeDigit,
    4: fourDigit,
    5: fiveDigit,
    6: sixDigit,
    7: sevenDigit,
    8: eightDigit,
    9: nineDigit,
};

interface DigitProps {
    value: number;
}

const Digit = styled.div<DigitProps>`
    height: 94%;
    width: 30%;

    background-image: url(${(props) => digitImages[props.value]});

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    mix-blend-mode: normal;
`;

interface DigitProviderProps {
    value: number;
}

const DigitProvider = ({ value }: DigitProviderProps) => {
    return (
        <Conteiner>
            <Digit value={Math.floor(value / 100)} />
            <Digit value={Math.floor(value / 10) % 10} />
            <Digit value={value % 10} />
        </Conteiner>
    );
};

export default DigitProvider;
