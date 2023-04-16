import { useEffect, useState } from "react";
import styled from "styled-components";
import { backColor, bodyColor, fadeIn } from "./globalStyle";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setModalOn } from "../module/store";
import arrowIcon from "../img/arrowIcon.png";
import { Props } from "./App";
import { auth } from "../fBase";
import { useNavigate } from "react-router-dom";
import { isBrowser, isMobile } from "react-device-detect";

const Nav = styled(motion.div)`
  margin-top: 100px;
  height: ${isMobile ? "400px" : "600px"};
  background-color: ${bodyColor};
  width: 300px;
  display: flex;
  position: fixed;
  z-index: 300;
  justify-content: right;
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 19%);
  flex-direction: column;
  border-radius: 8px;
  padding-bottom: ${isMobile ? "15px" : ""};
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
  background-color: #c0c0c0;
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
  margin-top: ${isMobile ? "" : "150px"};
  border-top: ${isMobile ? "" : "0.5px solid #848484"};
  :hover {
    background-color: rgb(196, 196, 196);
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
const Icon = styled.img`
  filter: invert(76%) sepia(95%) saturate(3%) hue-rotate(314deg) brightness(98%)
    contrast(99%);
`;
function Navigation({
  isModal,
  setSelectedWindow,
  setSelectedUser,
  setIsMine,
  on,
  setOn,
}: Props) {
  const { userInfo, isLogin } = useSelector((state: any) => ({
    userInfo: state.store.userInfo,
    isLogin: state.store.isLogin,
  }));
  const dispatch = useDispatch();

  const [name, setName] = useState("비회원");
  const navigate = useNavigate();

  function navOnOff() {
    if (isModal === false && isMobile === false) {
      setOn((prev: any) => !prev);
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
      navigate(`/${userInfo.displayName}`);
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

  console.log(userInfo);
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
                {isLogin && userInfo.displayName !== null
                  ? userInfo.displayName.slice(0, 1)
                  : "?"}
              </ProfileIcon>
            </Profile>
            <NickName onClick={() => callModal("Auth")}>{name}</NickName>
            <NavItem onClick={goToMy}>내 컬렉션</NavItem>
            <NavItem
              onClick={() => {
                setSelectedWindow(0);
                navigate(`/`);
              }}
            >
              컬렉션 탐색
            </NavItem>
            <NavItem>즐겨찾기</NavItem>
            <NavItem onClick={() => callModal("Setting")}>설정</NavItem>
            {isLogin ? <LogOut onClick={logOut}>로그아웃</LogOut> : null}
          </Nav>
        ) : (
          <>
            {isMobile ? null : (
              <NavHover onMouseOver={navOnOff}>
                <Icon style={{ opacity: "50%" }} src={arrowIcon} />
              </NavHover>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
