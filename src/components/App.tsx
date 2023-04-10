import React, { useEffect, useState } from "react";
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
import Main from "./Main";
import { bodyColor } from "./globalStyle";
import Welcome from "./Welcome";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const AppContainer = styled.div`
  background-color: ${bodyColor}; //#505074; // #29293d
  width: 1000px;
  min-height: 800px;
  margin: 0 auto;
  padding-top: 60px;
  // border: #6698be 3px solid;
`;

export interface Props {
  isModal?: boolean;
  modalType?: string;
  modalOff?: (e: any) => void;
}

function App() {
  const { isLogin, isModal, modalType, userData } = useSelector(
    (state: any) => ({
      isModal: state.store.isModal,
      modalType: state.store.modalType,
      userData: state.store.userData,
      isLogin: state.store.isLogin,
    })
  );

  const dispatch = useDispatch();
  const [tabContents, setTabContents] = useState("movie");
  const [isExplore, setIsExpore] = useState(false);

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
  }, [isLogin]);
  return (
    <>
      <GlobalStyle />
      <Modal isModal={isModal} modalType={modalType} modalOff={modalOff} />
      <Navigation isModal={isModal} />
      <TopTab
        tabContents={tabContents}
        userData={userData}
        setTabContents={setTabContents}
        isLogin={isLogin}
      />
      <AppContainer>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            key="motionDiv"
          >
            {isLogin && isExplore === false ? (
              <Main tabContents={tabContents} />
            ) : (
              <Welcome isModal={isModal} />
            )}
          </motion.div>
        </AnimatePresence>
      </AppContainer>
    </>
  );
}

export default App;
