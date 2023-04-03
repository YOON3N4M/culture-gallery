import { useState } from "react";
import styled from "styled-components";
import { fadeIn } from "./globalStyle";
import { motion, AnimatePresence } from "framer-motion";

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
`;

const NavHover = styled.div`
  height: 100vh;
  width: 100px;
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

function Navigation() {
  const [on, setOn] = useState(false);
  function NavOnOff() {
    setOn((prev) => !prev);
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
            onMouseOut={NavOnOff}
          />
        ) : (
          <NavHover onMouseOver={NavOnOff}>
            <NavBtn></NavBtn>
          </NavHover>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
