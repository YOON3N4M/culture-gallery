import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import logoImg from "../img/1.png";
import { tabColor } from "./globalStyle";

const Tab = styled.div`
  width: 100vw;
  height: 50px;
  background-color: ${tabColor};
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
  //border-bottom-left-radius: 15px;
  //border-bottom-right-radius: 15px;
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
const MenuLabel = styled.span`
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
  background-color: rgb(26, 26, 26);
  width: 100px;
  height: 180px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0px 20px 0px;
  z-index: 2000;
`;

interface Props {
  setTabContents: any;
  userData: any;
  tabContents: string;
}

function TopTab({ tabContents, setTabContents, userData }: Props) {
  console.log(userData);
  const [book, setBook] = useState(0);
  const [movie, setMovie] = useState(0);
  const [tv, setTv] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (userData !== undefined) {
      setMovie(userData.internationalMovie.length);
      setBook(userData.book.length);
      setTv(userData.tv.length);
      setQty(userData.internationalMovie.length);
    }
  }, [userData]);

  useEffect(() => {
    if (userData !== undefined) {
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
  }, [tabContents]);

  function menuOpen() {
    setIsOpen((prev) => !prev);
  }
  function onClick(culture: string) {
    setTabContents(culture);
  }

  return (
    <>
      <Tab>
        <Logo>CultureGallery</Logo>
        <div>
          <MenuLabel>세남님의 </MenuLabel>
          <MenuBtn onClick={menuOpen}>
            {tabContents.toUpperCase()} ({qty})
          </MenuBtn>
          <AnimatePresence>
            {isOpen ? (
              <MenuBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="menuBox"
              >
                <MenuBtn onClick={() => onClick("all")}>
                  ALL ({movie + tv + book})
                </MenuBtn>
                <MenuBtn onClick={() => onClick("movie")}>
                  MOVIE ({movie})
                </MenuBtn>
                <MenuBtn onClick={() => onClick("tv")}>TV ({tv})</MenuBtn>
                <MenuBtn onClick={() => onClick("book")}>BOOK ({book})</MenuBtn>
              </MenuBox>
            ) : null}
          </AnimatePresence>
        </div>
        <FAQ>?</FAQ>
      </Tab>
    </>
  );
}

export default TopTab;
