import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dbService } from "../fBase";
import { setModalOn } from "../module/store";
import postingIcon from "../img/postingIcon.png";
import { motion } from "framer-motion";
import useDidMountEffect from "./useDidMountEffect";

const ContentsHeader = styled.div`
  height: 50px;
  //background-color: blue;
  display: flex;

  align-items: center;

  z-index: 100;
  margin-left: 100px;
`;

export const ContentsBody = styled(motion.div)`
  //background-color: red;
  width: 1060px;
  margin: 0 auto;
  z-index: 300;
  display: flex;
`;
export const ContentsUl = styled(motion.ul)`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const Buttonn = styled.button`
  cursor: pointer;
`;

export const Item = styled(motion.div)`
  margin: 15px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  //background-color: red;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;
export const CollectionImg = styled.img<{ isBook: boolean }>`
  width: ${(props: any) => (props.isBook ? "120px" : "180px")};
  height: ${(props: any) => (props.isBook ? "174px" : "273px")};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin: 0 auto;
`;

export const TitleBox = styled.div`
  background-color: white;
  width: 181px;
  height: 80px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px #e3e3e3 solid;
  padding: 10px 10px 10px 10px;
`;
export const Title = styled.h2<{ isBook: boolean }>`
  width: ${(props: any) => (props.isBook ? "120px" : "150px")};
  white-space: nowrap;
  font-size: 15px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  font-weight: 400;
`;
export const Year = styled.p`
  font-size: 12px;
  color: #a5a5a5;
`;

const DelBtn = styled.button`
  width: 20px;
  height: 20px;
  background-color: white;
  position: absolute;
  margin-left: 150px;
  margin-top: 10px;
  opacity: 60%;
  border-radius: 50%;
  cursor: pointer;
`;
interface Props {
  tabContents: string;
  isMine: boolean;
  selectedUser: any;
}

function Main({ tabContents, isMine, selectedUser }: Props) {
  const dispatch = useDispatch();
  const [internationalMovie, setInternationMovie] = useState<any>([]);
  const [tv, setTv] = useState<any>([]);
  const [book, setBook] = useState<any>([]);
  const [all, setAll] = useState<any>([]);
  const [hideDelBtn, setHideDelBtn] = useState(true);

  const { isLogin, userData } = useSelector((state: any) => ({
    userData: state.store.userData,
    isLogin: state.store.isLogin,
  }));

  function isMyCollection() {
    if (isMine) {
      setHideDelBtn((prev) => !prev);
    }
  }
  function delFromDB(i: string) {}
  useEffect(() => {
    if (isMine) {
      setInternationMovie([]);
      setBook([]);
      setTv([]);
      if (userData) {
        const allArrTemp = [
          ...userData.internationalMovie,
          ...userData.book,
          ...userData.tv,
        ];
        setInternationMovie(userData.internationalMovie);
        setBook(userData.book);
        setTv(userData.tv);
        setAll(allArrTemp);
      }
    } else {
      if (selectedUser) {
        const allArrTemp = [
          ...selectedUser.internationalMovie,
          ...selectedUser.book,
          ...selectedUser.tv,
        ];
        setInternationMovie(selectedUser.internationalMovie);
        setBook(selectedUser.book);
        setTv(selectedUser.tv);
        setAll(allArrTemp);
      }
    }
  }, [userData]);

  useDidMountEffect(() => {
    if (isMine) {
      setInternationMovie([]);
      setBook([]);
      setTv([]);
      if (userData) {
        const allArrTemp = [
          ...userData.internationalMovie,
          ...userData.book,
          ...userData.tv,
        ];
        setInternationMovie(userData.internationalMovie);
        setBook(userData.book);
        setTv(userData.tv);
        setAll(allArrTemp);
      }
    } else {
      if (selectedUser) {
        const allArrTemp = [
          ...selectedUser.internationalMovie,
          ...selectedUser.book,
          ...selectedUser.tv,
        ];
        setInternationMovie(selectedUser.internationalMovie);
        setBook(selectedUser.book);
        setTv(selectedUser.tv);
        setAll(allArrTemp);
      }
    }
  }, [selectedUser]);
  return (
    <>
      <ContentsHeader></ContentsHeader>
      <ContentsBody>
        {
          {
            all: (
              <ContentsUl>
                {all.length !== 0
                  ? all.map((item: any) => (
                      <>
                        <Item
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                        >
                          <CollectionImg
                            isBook={false}
                            src={item.poster}
                          ></CollectionImg>
                          <TitleBox>
                            <Title isBook={false}>{item.title}</Title>
                            <Year>{item.year}</Year>
                          </TitleBox>
                        </Item>
                      </>
                    ))
                  : null}
              </ContentsUl>
            ),
            movie: (
              <ContentsUl>
                {internationalMovie.length !== 0
                  ? internationalMovie.map((item: any) => (
                      <>
                        <Item
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          onMouseEnter={isMyCollection}
                          onMouseLeave={isMyCollection}
                        >
                          {hideDelBtn ? null : <DelBtn>X</DelBtn>}

                          <CollectionImg
                            isBook={false}
                            src={item.poster}
                          ></CollectionImg>
                          <TitleBox>
                            <Title isBook={false}>{item.title}</Title>
                            <Year>{item.year}</Year>
                          </TitleBox>
                        </Item>
                      </>
                    ))
                  : null}
              </ContentsUl>
            ),
            book: (
              <>
                <ContentsUl>
                  {book.length !== 0
                    ? book.map((item: any) => (
                        <Item
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                        >
                          <CollectionImg
                            isBook={true}
                            src={item.poster}
                          ></CollectionImg>
                          <TitleBox>
                            <Title isBook={true}>{item.title}</Title>
                            <Year>{item.year}</Year>
                          </TitleBox>
                        </Item>
                      ))
                    : null}
                </ContentsUl>
              </>
            ),
            tv: (
              <>
                <ContentsUl>
                  {tv.length !== 0
                    ? tv.map((item: any) => (
                        <Item
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                        >
                          <CollectionImg
                            isBook={false}
                            src={item.poster}
                          ></CollectionImg>
                          <TitleBox>
                            <Title isBook={false}>{item.title}</Title>
                            <Year>{item.year}</Year>
                          </TitleBox>
                        </Item>
                      ))
                    : null}
                </ContentsUl>
              </>
            ),
          }[tabContents]
        }
      </ContentsBody>
    </>
  );
}

export default Main;
