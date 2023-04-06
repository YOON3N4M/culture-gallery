import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { GlobalStyle } from "./globalStyle";
import styled from "styled-components";
import TopTab from "./TopTab";
import { useSelector } from "react-redux";
import Modal from "./modal/Modal";
import { useDispatch } from "react-redux";
import {
  setModalOff,
  setModalOn,
  setSignIn,
  setSignOut,
  setUserData,
  setUserInfo,
} from "../module/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dbService } from "../fBase";
import { doc, getDoc } from "firebase/firestore";

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
  async function getUserDataFromDB(user: any) {
    const docRef = doc(dbService, "user", user.uid);
    const docSnap = await getDoc(docRef);
    dispatch(setUserData(docSnap.data()));
  }
  //앱 실행시 최초 로그인 체크
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch(setSignIn());
        dispatch(setUserInfo(user));
        getUserDataFromDB(user);
      } else {
        dispatch(setSignOut());
        dispatch(setUserInfo({}));
      }
    });
  }, []);
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
