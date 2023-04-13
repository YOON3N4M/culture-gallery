import {
  arrayRemove,
  doc,
  FieldValue,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dbService } from "../fBase";
import { setModalOn } from "../module/store";
import postingIcon from "../img/postingIcon.png";
import { motion } from "framer-motion";
import useDidMountEffect from "./useDidMountEffect";
import { ContentsT } from "./Explore";

const ContentsHeader = styled.div`
  height: 50px;
  width: 1060px;
  //background-color: blue;
  display: flex;
  align-items: center;
  justify-content: right;
  z-index: 100;
  margin: 0 auto;
  padding: 0 20px;
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

const EditBtn = styled.button`
  font-size: 17px;
  cursor: pointer;
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

  const { isLogin, userData, userInfo } = useSelector((state: any) => ({
    userData: state.store.userData,
    isLogin: state.store.isLogin,
    userInfo: state.store.userInfo,
  }));

  function isMyCollection() {
    if (isMine) {
      setHideDelBtn((prev) => !prev);
    }
  }
  async function delFromDB(i: ContentsT) {
    console.log("del");
    const ref = doc(dbService, "user", userInfo.uid);
    //데이터 베이스에서 삭제
    if (tabContents === "movie") {
      await updateDoc(ref, {
        internationalMovie: arrayRemove({
          id: i.id,
          poster: i.poster,
          title: i.title,
          year: i.year,
          comment: i.comment,
        }),
      });
    }
    if (tabContents === "tv") {
      await updateDoc(ref, {
        tv: arrayRemove({
          id: i.id,
          poster: i.poster,
          title: i.title,
          year: i.year,
          comment: i.comment,
        }),
      });
    }
    if (tabContents === "book") {
      console.log("book");
      await updateDoc(ref, {
        book: arrayRemove({
          id: i.id,
          poster: i.poster,
          title: i.title,
          year: i.year,
          comment: i.comment,
        }),
      });
    }
    //현재 출력 배열에서 삭제 (실시간으로 보여지는 것)
    let newArr;
    if (tabContents === "movie") {
      newArr = await internationalMovie.filter(
        (item: ContentsT) => item.id !== i.id
      );

      setInternationMovie(newArr);
    }
    if (tabContents === "tv") {
      newArr = await tv.filter((item: ContentsT) => item.id !== i.id);

      setTv(newArr);
    }
    if (tabContents === "book") {
      newArr = await book.filter((item: ContentsT) => item.id !== i.id);

      setBook(newArr);
    }
  }

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
      <ContentsHeader>
        {isMine && tabContents !== "all" ? (
          <EditBtn onClick={isMyCollection}>편집</EditBtn>
        ) : null}
      </ContentsHeader>
      <ContentsBody>
        {
          {
            all: (
              <ContentsUl>
                {all.length !== 0
                  ? all.map((item: ContentsT) => (
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
                  ? internationalMovie.map((item: ContentsT) => (
                      <>
                        <Item
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                        >
                          {hideDelBtn ? null : (
                            <DelBtn onClick={() => delFromDB(item)}>X</DelBtn>
                          )}

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
                    ? book.map((item: ContentsT) => (
                        <Item
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                        >
                          {hideDelBtn ? null : (
                            <DelBtn onClick={() => delFromDB(item)}>X</DelBtn>
                          )}
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
                    ? tv.map((item: ContentsT) => (
                        <Item
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                        >
                          {hideDelBtn ? null : (
                            <DelBtn onClick={() => delFromDB(item)}>X</DelBtn>
                          )}
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
