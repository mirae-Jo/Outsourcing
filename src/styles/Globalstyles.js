import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import kbodiabold from '../assets/fonts/KBO-Dia-Gothic_bold.woff';
import kbodia from '../assets/fonts/KBO-Dia-Gothic_medium.woff';
import kbodialight from '../assets/fonts/KBO-Dia-Gothic_light.woff';

export const GlobalStyles = createGlobalStyle`

    ${reset}

    :root{
        --color-background:#E8F6EF;
        --color-main:#08C466;
    }
   
    *{
        box-sizing:border-box;
    }
    button{
        background-color: none;
        border:none;
        cursor:pointer;
    }
    a{
        text-decoration: none;
    }
    @font-face {
        font-family:"KBO-Dia-bold";
        src: url(${kbodiabold});
    }
    @font-face {
        font-family:"KBO-Dia";
        src: url(${kbodia});
    }
    @font-face {
        font-family:"KBO-Dia-light";
        src: url(${kbodialight});
    }
    body{
        font-family: 'KBO-Dia';
        letter-spacing: -0.03cap;
        margin: 0;
    }
    ul,li{
        list-style: none;
    }

    
`;
