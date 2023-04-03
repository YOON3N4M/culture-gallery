import React from "react";

import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { GlobalStyle } from "./globalStyle";
import styled from "styled-components";
import TopTab from "./TopTab";

const AppContainer = styled.div`
  background-color: #505074; // #29293d
  width: 1000px;
  height: 1500px;
  margin: 0 auto;
  padding-top: 60px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <TopTab />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  );
}

export default App;
