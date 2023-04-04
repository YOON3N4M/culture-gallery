import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { GlobalStyle } from "./globalStyle";
import styled from "styled-components";
import TopTab from "./TopTab";
import { useSelector } from "react-redux";
import Modal from "./modal/Modal";
import { useDispatch } from "react-redux";
import { setModalOff, setModalOn } from "../module/store";

const AppContainer = styled.div`
  background-color: #505074; // #29293d
  width: 1000px;
  height: 1500px;
  margin: 0 auto;
  padding-top: 60px;
`;

export interface Props {
  isModal?: boolean;
  modalType?: string;
  modalOff?: (e: any) => void;
}

function App() {
  const { isModal, modalType } = useSelector((state: any) => ({
    isModal: state.store.isModal,
    modalType: state.store.modalType,
  }));
  const dispatch = useDispatch();

  function modalOff(e: any) {
    if (e.target === e.currentTarget) {
      dispatch(setModalOff());
    }
  }

  return (
    <>
      <GlobalStyle />
      <Modal isModal={isModal} modalType={modalType} modalOff={modalOff} />
      <Navigation isModal={isModal} />
      <TopTab />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  );
}

export default App;
