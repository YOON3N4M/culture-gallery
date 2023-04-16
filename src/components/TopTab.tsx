import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../img/1.png";
import menuIcon from "../img/menuIcon.png";
import plusIcon from "../img/plusIcon.png";
import qnaIcon from "../img/qnaIcon.png";
import moreIcon from "../img/moreIcon.png";
import { setModalOn } from "../module/store";
import { UserT } from "./Explore";
import { tabColor } from "./globalStyle";
import useDidMountEffect from "./useDidMountEffect";

const Tab = styled(motion.div)`
  width: 100vw;
  height: 55px;
  background-color: black;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  //border-bottom-left-radius: 15px;
  //border-bottom-right-radius: 15px;
  z-index: 1000;
  border-bottom: #2a2a2a 1px solid;
  padding: 0px 1rem;
`;
const TabItem = styled.div`
  flex-direction: 1;
  width: 30%;
  display: flex;
  height: 100%;
  align-items: center;
`;
const FAQ = styled.button`
  cursor: pointer;
`;

const Logo = styled.span<{ isMobile: boolean }>`
  color: white;
  font-weight: 900;
  cursor: pointer;
  font-size: 1rem;
  opacity: ${(props) => (props.isMobile ? 0 : 1)};
`;
const LogoImg = styled.img`
  width: 25px;
  height: 25px;
  opacity: 50%;
  margin-right: -10px;
`;

const MenuContainer = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  display: inline-block;
`;

const MenuLabel = styled(motion.span)`
  color: white;
  font-size: ${isMobile ? "12px" : "14px"};
`;
const MenuBtn = styled.button`
  color: white;
  font-size: ${isMobile ? "12px" : "14px"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
`;
const MenuBox = styled(motion.div)`
  position: absolute;
  background-color: black;
  width: 100px;
  height: 180px;
  margin-left: ${isMobile ? "" : "25px"};
  margin-top: ${isMobile ? "" : "5px"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0px 20px 0px;
  z-index: 2000;
`;

const Add = styled.button`
  border-radius: 50%;

  color: white;
  cursor: pointer;
  margin-right: ${isMobile ? "" : "1rem"};
`;
const RightMenu = styled.div`
  //background-color: red;
  display: flex;
  align-items: center;
  justify-content: right;
  flex-grow: 1;
`;

const Explore = styled.span`
  color: white;
`;

const NavBtn = styled.button`
  color: white;
  font-size: 25px;
  padding: 0 0;
  box-sizing: border-box;
  line-height: 20px;
`;
interface Props {
  setTabContents: any;
  userData: any;
  tabContents: string;
  isLogin: boolean;
  selectedUser: any;
  selectedWindow: number;
  on: boolean;
  setOn: any;
}

function TopTab({
  tabContents,
  setTabContents,
  userData,
  isLogin,
  selectedUser,
  selectedWindow,
  setOn,
}: Props) {
  const [book, setBook] = useState(0);
  const [movie, setMovie] = useState(0);
  const [tv, setTv] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState(0);
  const [nickname, setNickname] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function callAuthModal() {
    dispatch(setModalOn("FAQ"));
  }

  function callModal(e: string) {
    dispatch(setModalOn(e));
  }
  function navOnOff() {
    setOn((prev: any) => !prev);
  }
  function logoClick() {
    navigate(`/`);
  }
  useEffect(() => {
    if (userData !== undefined && selectedUser === undefined) {
      setMovie(userData.internationalMovie.length);
      setBook(userData.book.length);
      setTv(userData.tv.length);
      setQty(userData.internationalMovie.length);
      setNickname(userData.nickname);
    }
  }, [userData]);

  useDidMountEffect(() => {
    if (userData !== undefined && selectedUser === undefined) {
      setMovie(userData.internationalMovie.length);
      setBook(userData.book.length);
      setTv(userData.tv.length);
      setQty(userData.internationalMovie.length);
      setNickname(userData.nickname);
    }
    if (selectedUser !== undefined) {
      setMovie(selectedUser.internationalMovie.length);
      setBook(selectedUser.book.length);
      setTv(selectedUser.tv.length);
      setQty(selectedUser.internationalMovie.length);
      setNickname(selectedUser.nickname);
    }
    if (userData !== undefined && selectedUser === undefined) {
      if (tabContents === "movie") {
        setQty(userData.internationalMovie.length);
      } else if (tabContents === "book") {
        setQty(userData.book.length);
      } else if (tabContents === "tv") {
        setQty(userData.tv.length);
      } else if (tabContents === "all") {
        setQty(movie + tv + book);
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    if (userData !== undefined && selectedUser === undefined) {
      if (tabContents === "movie") {
        setQty(userData.internationalMovie.length);
      } else if (tabContents === "book") {
        setQty(userData.book.length);
      } else if (tabContents === "tv") {
        setQty(userData.tv.length);
      } else if (tabContents === "all") {
        setQty(movie + tv + book);
      }
    } else if (selectedUser !== undefined) {
      if (tabContents === "movie") {
        setQty(selectedUser.internationalMovie.length);
      } else if (tabContents === "book") {
        setQty(selectedUser.book.length);
      } else if (tabContents === "tv") {
        setQty(selectedUser.tv.length);
      } else if (tabContents === "all") {
        setQty(movie + tv + book);
      }
    }
  }, [tabContents]);

  function menuOpen() {
    setIsOpen((prev) => !prev);
  }
  function onClick(culture: string) {
    setTabContents(culture);
  }

  return (
    <>
      <Tab initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <TabItem>
          {isMobile ? (
            <div>
              <NavBtn onClick={navOnOff}>
                <img style={{ width: "24px" }} src={menuIcon} />
              </NavBtn>
            </div>
          ) : (
            <Logo isMobile={isMobile} onClick={logoClick}>
              CultureGallery
            </Logo>
          )}
        </TabItem>
        <TabItem>
          <MenuContainer>
            {nickname !== "" && selectedWindow !== 0 ? (
              <motion.div
                style={{ position: "relative" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MenuLabel>{nickname}님의 </MenuLabel>
                <MenuBtn onClick={menuOpen}>
                  {tabContents.toUpperCase()} ({qty})
                  <img
                    src={moreIcon}
                    style={{ width: "12px", marginLeft: "7px" }}
                  />
                </MenuBtn>
                <AnimatePresence>
                  {isOpen ? (
                    <MenuBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      key="menuBox"
                    >
                      <MenuBtn
                        onClick={() => {
                          onClick("all");
                          menuOpen();
                        }}
                      >
                        ALL ({movie + tv + book})
                      </MenuBtn>
                      <MenuBtn
                        onClick={() => {
                          onClick("movie");
                          menuOpen();
                        }}
                      >
                        MOVIE ({movie})
                      </MenuBtn>
                      <MenuBtn
                        onClick={() => {
                          onClick("tv");
                          menuOpen();
                        }}
                      >
                        TV ({tv})
                      </MenuBtn>
                      <MenuBtn
                        onClick={() => {
                          onClick("book");
                          menuOpen();
                        }}
                      >
                        BOOK ({book})
                      </MenuBtn>
                    </MenuBox>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            ) : null}{" "}
            {selectedWindow === 0 ? <Explore>탐색</Explore> : null}
          </MenuContainer>
        </TabItem>
        <TabItem>
          <RightMenu>
            {isLogin && (
              <Add
                onClick={() => {
                  callModal("Posting");
                }}
              >
                <img style={{ width: "22px" }} src={plusIcon} />
              </Add>
            )}
            {isMobile ? null : (
              <FAQ onClick={callAuthModal}>
                <img style={{ width: "22px" }} src={qnaIcon} />
              </FAQ>
            )}
          </RightMenu>
        </TabItem>
      </Tab>
    </>
  );
}

export default TopTab;
