import { useEffect, useState } from "react";
import styled from "styled-components";
import { backColor, bodyColor, fadeIn } from "./globalStyle";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setModalOn } from "../module/store";
import arrowIcon from "../img/arrowIcon.png";
import { Props } from "./App";
import { auth } from "../fBase";

const Nav = styled(motion.div)`
  margin-top: 100px;
  height: 600px;
  background-color: ${bodyColor};
  width: 300px;
  display: flex;
  position: fixed;
  z-index: 300;
  justify-content: right;
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 19%);
  flex-direction: column;
  border-radius: 8px;
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
  background-color: gray;
  cursor: pointer;
  text-align: center;
  line-height: 80px;
  font-size: 40px;
`;
const NickName = styled.div`
  width: 100%;
  height: 50px;
  // background-color: black;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 0.5px solid #848484;
  cursor: pointer;
  :hover {
    background-color: rgb(196, 196, 196);
  }
`;
const NavItem = styled.div`
  width: 100%;
  height: 50px;
  // background-color: black;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 0.5px solid #848484;

  cursor: pointer;
  :hover {
    background-color: rgb(196, 196, 196);
  }
`;
const LogOut = styled.div`
  width: 100%;
  height: 50px;
  // background-color: black;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 0.5px solid #848484;
  cursor: pointer;
  margin-top: 150px;
  border-top: 0.5px solid #848484;
  :hover {
    background-color: rgb(26, 26, 26);
  }
`;
const Collection = styled.div``;

const NavHover = styled.div`
  margin-top: 50px;
  height: 700px;
  width: 50px;
  display: inline-block;
  position: fixed;
  z-index: 300;

  display: flex;
  align-items: center;
  justify-content: right;
  animation: ${fadeIn} linear 0.8s;
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

function Navigation({
  isModal,
  setSelectedWindow,
  setSelectedUser,
  setIsMine,
}: Props) {
  const { userInfo, isLogin } = useSelector((state: any) => ({
    userInfo: state.store.userInfo,
    isLogin: state.store.isLogin,
  }));
  const dispatch = useDispatch();
  const [on, setOn] = useState(false);
  const [name, setName] = useState("비회원");
  function navOnOff() {
    if (isModal === false) {
      setOn((prev) => !prev);
    }
  }
  function callModal(e: string) {
    console.log(isLogin);
    if (isLogin === false && e === "Auth") {
      dispatch(setModalOn(e));
    }
    if (isLogin && e === "Setting") {
      dispatch(setModalOn(e));
    }
    if (e === "Explore") {
      dispatch(setModalOn(e));
    }
  }

  function logOut() {
    auth.signOut();
  }

  function goToMy() {
    if (isLogin) {
      setSelectedWindow(1);
      setSelectedUser(undefined);
      setIsMine(true);
    } else {
      alert("로그인 후 이용 가능합니다.");
    }
  }

  useEffect(() => {
    if (userInfo.displayName !== undefined) {
      setName(userInfo.displayName);
    } else {
      setName("로그인 / 회원가입");
    }
  }, [userInfo.displayName]);

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
              <ProfileIcon onClick={() => callModal("Auth")}>
                {isLogin ? userInfo.displayName.slice(0, 1) : "?"}
              </ProfileIcon>
            </Profile>
            <NickName onClick={() => callModal("Auth")}>{name}</NickName>
            <NavItem onClick={goToMy}>내 컬렉션</NavItem>
            <NavItem onClick={() => setSelectedWindow(0)}>컬렉션 탐색</NavItem>
            <NavItem>즐겨찾기</NavItem>
            <NavItem onClick={() => callModal("Setting")}>설정</NavItem>
            {isLogin ? <LogOut onClick={logOut}>로그아웃</LogOut> : null}
          </Nav>
        ) : (
          <NavHover onMouseOver={navOnOff}>
            <img style={{ opacity: "30%" }} src={arrowIcon} />
          </NavHover>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
