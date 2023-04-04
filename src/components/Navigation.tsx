import { useState } from "react";
import styled from "styled-components";
import { fadeIn } from "./globalStyle";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { setModalOn, StateT } from "../module/store";
import { useDispatch } from "react-redux";
import { Props } from "./App";

const Nav = styled(motion.div)`
  margin-top: 100px;
  height: 600px;
  background-color: white;
  width: 300px;
  display: flex;
  position: fixed;
  z-index: 300;
  justify-content: right;
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 19%);
  flex-direction: column;
`;
const Profile = styled.div`
  width: 100%;
  height: 100px;
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid #848484;
`;
const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: black;
  cursor: pointer;
`;
const NickName = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 0.5px solid #848484;
`;
const Collection = styled.div``;

const NavHover = styled.div`
  height: 100vh;
  width: 10px;
  display: inline-block;
  position: fixed;
  z-index: 300;
  opacity: 10%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 30px;
`;

const NavBtn = styled.button`
  border-radius: 50%;
  background-color: white;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: black;
  animation: ${fadeIn} linear 0.3s;
`;

function Navigation({ isModal }: Props) {
  const dispatch = useDispatch();
  const [on, setOn] = useState(false);

  function navOnOff() {
    if (isModal === false) {
      setOn((prev) => !prev);
    }
  }
  function callAuthModal() {
    dispatch(setModalOn("Auth"));
  }
  return (
    <>
      {" "}
      <AnimatePresence>
        {on ? (
          <Nav
            key="nav"
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -400 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            onMouseLeave={navOnOff}
          >
            <Profile>
              <ProfileIcon onClick={callAuthModal} />
            </Profile>
            <NickName>윤세남</NickName>
          </Nav>
        ) : (
          <NavHover onMouseOver={navOnOff}>
            <NavBtn></NavBtn>
          </NavHover>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;