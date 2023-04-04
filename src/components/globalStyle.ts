import { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`

@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

  body {  

    font-family: 'Nanum Gothic','S-CoreDream-3Light', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #29293d;
    color:black;
    margin: 0;

   
  }
  *{
    box-sizing: border-box;
    &::-webkit-scrollbar {
    display: none;
  }
  }
  a{
    text-decoration: none;
    color:inherit;
  }
  button{
    background: none;
    border: none;
  }
  input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
}
`;

export const naviAnimation = keyframes`
from {
		transform: translate(-400px, 0);
	}
	to {
		transform: translate(0px, 0px);
	}`;

export const fadeIn = keyframes`
from{
    opacity: 0;
} to {
    opacity: 1;
}
`;
