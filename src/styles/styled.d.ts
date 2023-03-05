import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;
        colors: {
            primary: string;
            secondary: string;
            background: string;
            accent: string;
            text: string;
        };
        media: {
            phone: string;
            tablet: string;
        };
    }
}
