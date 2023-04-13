import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../img/1.png";
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
  justify-content: space-between;
  align-items: center;
  padding: 0px 180px 0px 180px;
  //border-bottom-left-radius: 15px;
  //border-bottom-right-radius: 15px;
  z-index: 1000;
  border-bottom: #2a2a2a 1px solid;
`;
const FAQ = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: white;
  opacity: 50%;
  cursor: pointer;
`;

const Logo = styled.span`
  color: white;
  font-weight: 900;
  cursor: pointer;
`;
const LogoImg = styled.img`
  width: 25px;
  height: 25px;
  opacity: 50%;
  margin-right: -10px;
`;

const MenuContainer = styled.div``;

const MenuLabel = styled(motion.span)`
  color: white;
  font-size: 14px;
`;
const MenuBtn = styled.button`
  color: white;
  font-size: 14px;
  cursor: pointer;
`;
const MenuBox = styled(motion.div)`
  position: absolute;
  background-color: black;
  width: 100px;
  height: 180px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0px 20px 0px;
  z-index: 2000;
`;

const Add = styled.button`
  border-radius: 50%;
  font-size: 30px;
  color: white;
  cursor: pointer;
  margin-right: 30px;
`;
const RightMenu = styled.div`
  //background-color: red;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 10px;
`;

const Explore = styled.span`
  color: white;
`;
interface Props {
  setTabContents: any;
  userData: any;
  tabContents: string;
  isLogin: boolean;
  selectedUser: any;
  selectedWindow: number;
}

function TopTab({
  tabContents,
  setTabContents,
  userData,
  isLogin,
  selectedUser,
  selectedWindow,
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

  console.log(selectedUser);
  return (
    <>
      <Tab initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Logo onClick={logoClick}>CultureGallery</Logo>
        <MenuContainer>
          {nickname !== "" && selectedWindow !== 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <MenuLabel>{nickname}님의 </MenuLabel>
              <MenuBtn onClick={menuOpen}>
                {tabContents.toUpperCase()} ({qty})
              </MenuBtn>
            </motion.div>
          ) : null}{" "}
          {selectedWindow === 0 ? <Explore>탐색</Explore> : null}
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
        </MenuContainer>
        <RightMenu>
          {isLogin && (
            <Add
              onClick={() => {
                callModal("Posting");
              }}
            >
              +
            </Add>
          )}

          <FAQ onClick={callAuthModal}>?</FAQ>
        </RightMenu>
      </Tab>
    </>
  );
}

export default TopTab;
