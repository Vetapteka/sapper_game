import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;
        colors: {
            primary: string;
            secondary: string;
            background: string;
            tileBackground: string;
            accent: string;
            error: string;
            text: string;
        };
        media: {
            phone: string;
            tablet: string;
        };
    }
}
