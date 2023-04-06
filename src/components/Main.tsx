import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dbService } from "../fBase";
import { setModalOn } from "../module/store";
import postingIcon from "../img/postingIcon.png";

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

const ContentsBody = styled.div`
  //background-color: red;
  width: 900px;
  margin: 0 auto;
  z-index: 300;

  display: flex;
`;
const ContentsUl = styled.ul`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const Buttonn = styled.button`
  cursor: pointer;
`;

const Item = styled.div`
  margin: 15px 15px 15px 15px;
  display: flex;
  flex-direction: column;
`;
const CollectionImg = styled.img<{ isBook: boolean }>`
  width: ${(props: any) => (props.isBook ? "120px" : "150px")};
  height: ${(props: any) => (props.isBook ? "174px" : "250px")};

  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
  margin-bottom: 5px;
`;
const Title = styled.span`
  width: 150px;
  white-space: nowrap;
  font-size: 15px;

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

  async function getCultureFromDB(item: any, culture: string) {
    //영화 가져오기
    if (culture === "movie") {
      const movieID = String(item);
      const interMovieRef = doc(dbService, "internationalMovie", movieID);
      const docSnap = await getDoc(interMovieRef);
      if (docSnap.exists()) {
        const docSnapData = docSnap.data();
        setInternationMovie((prev: any) => [...prev, docSnapData]);
      }
      //책
    }
    if (culture === "book") {
      const bookID = item;
      const bookRef = doc(dbService, "book", bookID);
      const docSnap = await getDoc(bookRef);
      if (docSnap.exists()) {
        const docSnapData = docSnap.data();
        setBook((prev: any) => [...prev, docSnapData]);
      }
    }
    if (culture === "tv") {
      const tvID = String(item);
      const tvRef = doc(dbService, "tv", tvID);
      const docSnap = await getDoc(tvRef);
      if (docSnap.exists()) {
        const docSnapData = docSnap.data();
        setTv((prev: any) => [...prev, docSnapData]);
      }
    }
  }

  console.log(tv, book, internationalMovie);

  useEffect(() => {
    setInternationMovie([]);
    setBook([]);
    setTv([]);
    if (userData) {
      userData.internationalMovie.map((item: any) =>
        getCultureFromDB(item, "movie")
      );
      userData.book.map((item: any) => getCultureFromDB(item, "book"));
      userData.tv.map((item: any) => getCultureFromDB(item, "tv"));
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
                        <Item>
                          <CollectionImg
                            isBook={false}
                            src={item.Poster}
                          ></CollectionImg>
                          <Title>{item.Title}</Title>
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
                        <Item>
                          <CollectionImg
                            isBook={true}
                            src={item.Poster}
                          ></CollectionImg>
                          <Title>{item.Title}</Title>
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
                        <Item>
                          <CollectionImg
                            isBook={false}
                            src={item.Poster}
                          ></CollectionImg>
                          <Title>{item.Title}</Title>
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
