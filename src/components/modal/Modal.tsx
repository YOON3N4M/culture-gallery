import { motion, AnimatePresence } from "framer-motion";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Props } from "../App";
import { bodyColor, borderColor, tabColor } from "../globalStyle";
import AuthModal from "./AuthModal";
import ExploreModal from "./ExploreModal";
import FAQModal from "./FAQModal";
import PostingModal from "./PostingModal";
import SettingModal from "./SettingModal";

const ModalContainer = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: hidden;
`;
const ModalBack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

export const ModalWindow = styled.div`
  min-width: ${isMobile ? "150px" : "300px"};
  min-height: ${isMobile ? "150px" : "350px"};
  text-align: center;
  text-decoration: none;
  background-color: white;
  //border-radius: 30px;
  overflow: hidden;
  align-items: center;
  border-radius: 8px;
`;
export const ModalHeader = styled.div`
  min-width: ${isMobile ? "80vw" : "500px"};
  min-height: 40px;
  //border-top-right-radius: 29px;
  // border-top-left-radius: 29px;
  background-color: #0d0d0d;
  border: 0px;
  //border-bottom: 1px solid rgb(42, 42, 42);
  line-height: 40px;
  color: white;
  border-top-right-radius: 8px;
`;

function Modal({
  isModal,
  modalType,
  modalOff,
  setIsExplore,
  setSelectedUser,
}: Props) {
  if (isModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <>
      <AnimatePresence>
        {isModal && modalType !== undefined ? (
          <ModalContainer
            key="modalContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalBack onClick={modalOff}>
              {
                {
                  Auth: <AuthModal modalOff={modalOff} />,
                  Posting: <PostingModal />,
                  FAQ: <FAQModal />,
                  Setting: <SettingModal />,
                  Explore: (
                    <ExploreModal
                      setSelectedUser={setSelectedUser}
                      setIsExplore={setIsExplore}
                    />
                  ),
                }[modalType]
              }
            </ModalBack>
          </ModalContainer>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Modal;
