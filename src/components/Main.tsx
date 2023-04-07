import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dbService } from "../fBase";
import { setModalOn } from "../module/store";
import postingIcon from "../img/postingIcon.png";
import { motion } from "framer-motion";

const ContentsHeader = styled.div`
  width: 1000px;
  height: 50px;
  //background-color: blue;
  display: flex;
  justify-content: right;
  align-items: center;

  z-index: 100;
`;
const Add = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 30px;
  margin-right: 20px;
  cursor: pointer;
  position: fixed;
  background-color: #ffffff17;
  align-items: center;
  color: #ffffff85;
  line-height: 30px;
`;

export const ContentsBody = styled(motion.div)`
  //background-color: red;
  width: 900px;
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
`;
export const CollectionImg = styled.img<{ isBook: boolean }>`
  width: ${(props: any) => (props.isBook ? "120px" : "150px")};
  height: ${(props: any) => (props.isBook ? "174px" : "250px")};

  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
  margin-bottom: 5px;
`;
export const Title = styled.span<{ isBook: boolean }>`
  width: ${(props: any) => (props.isBook ? "120px" : "150px")};
  white-space: nowrap;
  font-size: 15px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a5a5a5;
  font-weight: 400;
`;
interface Props {
  tabContents: string;
}

function Main({ tabContents }: Props) {
  const dispatch = useDispatch();
  const [internationalMovie, setInternationMovie] = useState<any>([]);
  const [tv, setTv] = useState<any>([]);
  const [book, setBook] = useState<any>([]);
  const { isLogin, userData } = useSelector((state: any) => ({
    userData: state.store.userData,
    isLogin: state.store.isLogin,
  }));

  function callModal(e: string) {
    dispatch(setModalOn(e));
  }

  useEffect(() => {
    setInternationMovie([]);
    setBook([]);
    setTv([]);
    if (userData) {
      setInternationMovie(userData.internationalMovie);
      setBook(userData.book);
      setTv(userData.tv);
    }
  }, [userData]);

  return (
    <>
      <ContentsHeader>
        {isLogin && (
          <Add
            onClick={() => {
              callModal("Posting");
            }}
          >
            +
          </Add>
        )}
      </ContentsHeader>
      <ContentsBody>
        {
          {
            all: <></>,
            movie: (
              <ContentsUl>
                {internationalMovie.length !== 0
                  ? internationalMovie.map((item: any) => (
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
                          <Title isBook={false}>{item.title}</Title>
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
                          <Title isBook={true}>{item.title}</Title>
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
                          <Title isBook={false}>{item.title}</Title>
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
