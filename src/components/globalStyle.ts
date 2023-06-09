import { createGlobalStyle, keyframes } from "styled-components";

const colorSample = {
  mint: "#68D3A8",
  opgg: "#EBEEF1",
};
export const tabColor = "white";
export const bodyColor = "#EBEEF1";
export const backColor = "#121212";
export const borderColor = "#2a2a2a";

export const GlobalStyle = createGlobalStyle`



@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  body {  

    font-family: 'Pretendard-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${backColor};
    color:black;
    margin: 0;

     &::-webkit-scrollbar {
    display: none
    ;
    }
  }

  
  *{
    box-sizing: border-box;
   
  

  

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
    outline: none;
    border: 0px;
    text-align: center;
}
ul{
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 0;
}
li{
  margin: 0;
}
h1{
  display: inline;
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
