import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Props } from "../App";
import AuthModal from "./AuthModal";

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
  width: 500px;
  height: 550px;
  text-align: center;
  text-decoration: none;
  background-color: white;
  border-radius: 30px;
  overflow: hidden;
`;
export const ModalHeader = styled.div`
  width: 500px;
  height: 80px;
  border-top-right-radius: 29px;
  border-top-left-radius: 29px;
  background-color: rgb(24, 24, 35);
  border: 0px;
`;

function Modal({ isModal, modalType, modalOff }: Props) {
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
                  Auth: <AuthModal />,
                  Posting: <span>posting</span>,
                  FAQ: <span>FAQ</span>,
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
