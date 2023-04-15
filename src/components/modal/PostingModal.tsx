import { useState } from "react";
import styled from "styled-components";
import { ModalHeader, ModalWindow } from "./Modal";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../../fBase";
import { useSelector } from "react-redux";
import movieIcon from "../../img/movieIcon.png";
import tvIcon from "../../img/tvIcon.png";
import bookIcon from "../../img/bookIcon.png";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserData } from "../../module/store";
import { isMobile } from "react-device-detect";

const ModalBody = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 0px 20px 0px 20px;
`;
const CultureBox = styled.div`
  width: ${isMobile ? "70px" : "115px"};
  height: ${isMobile ? "120px" : "125px"};
  margin-top: ${isMobile ? "30px" : "80px"};
  border-radius: 30px;
  cursor: pointer;
`;

const SearchContainer = styled(motion.div)`
  width: ${isMobile ? "300px" : "800px"};
  height: ${isMobile ? "300px" : "500px"};
  padding: ${isMobile ? "30px 0px 30px 0px" : "100px 0px 100px 0px"};
  margin: ${isMobile ? "0 auto" : ""};
  overflow: hidden;
`;

const SearchInput = styled.input`
  font-size: ${isMobile ? "15px" : "30px"};

  background-color: #ebeef1;
  color: black;
`;
const SearchResultContainer = styled.div`
  margin-top: ${isMobile ? "25px" : "50px"};
  height: ${isMobile ? "150px" : "300px"};
  display: flex;
  background-color: #ebeef1;
  justify-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  align-items: center;

  ::-webkit-scrollbar {
    width: ${isMobile ? "" : "1px"};
  }
  ::-webkit-scrollbar-thumb {
    width: ${isMobile ? "" : "1px"};
    height: ${isMobile ? "" : "1px"};
    background: ${isMobile ? "" : "#474747"};
    border-radius: 30px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
`;

const SearchResult = styled.li`
  width: ${isMobile ? "100px" : "200px"};
  height: ${isMobile ? "150px" : "250px"};
  justify-content: center;
  text-align: center;
  margin-right: ${isMobile ? "5px" : ""};
`;
const ThumnailSmall = styled(motion.img)`
  width: ${isMobile ? "70px" : "149px"};
  height: ${isMobile ? "105px" : "220px"};
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
  margin-top: 15px;
`;
const ThumnailMedium = styled.img`
  width: ${isMobile ? "100px" : "200px"};
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
`;

const Title = styled.span`
  width: ${isMobile ? "100px" : "200px"};
  white-space: nowrap;
  font-size: ${isMobile ? "8px" : "12px"};
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  font-weight: 700;
  opacity: 50%;
`;

const PostingContainer = styled(motion.div)`
  align-items: center;
  width: ${isMobile ? "300px" : "800px"};
  display: flex;
  justify-content: space-between;
  padding: 50px 10px 30px 10px;
`;
const ThumnailContainer = styled.div`
  width: 300px;
  // background-color: blue;
  padding-left: 30px;
`;
const InfoContainer = styled.div`
  width: 500px;
  height: 300px;
  // background-color: red;
`;
const InfoBox = styled.div`
  width: 100%;

  // background-color: green;
  margin-bottom: 10px;
`;

const Desc = styled.div`
  color: gray;
  margin-top: 90px;
  font-size: 13px;
`;
const SubmitBtn = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  width: 200px;
  height: 50px;
  background-color: #000000;
  border-radius: 8px;
  color: white;
`;
const CommentsInput = styled.input`
  width: 400px;
  height: 30px;
  font-size: 20px;

  // background-color: gray;

  background-color: #ebeef1;
  color: black;
`;

const ContentsIcon = styled.img`
  filter: invert(76%) sepia(95%) saturate(3%) hue-rotate(314deg) brightness(98%)
    contrast(99%);
  width: ${isMobile ? "70px" : ""}; ;
`;

interface MovieInfoT {
  Genre: string;
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
  comments?: [];
}

function PostingModal() {
  const [culture, setCulture] = useState("none");
  const [keyword, setKeyword] = useState("");
  const [searchResultArr, setSearchResult] = useState<any>([]);
  const [chosenCulture, setChosenCulture] = useState<any>();
  const [comment, setComment] = useState("");
  const MOVIE_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const posterBaseURL = `https://image.tmdb.org/t/p/w300`;
  const { userInfo, userData } = useSelector((state: any) => ({
    userInfo: state.store.userInfo,
    userData: state.store.userData,
  }));
  const dispatch = useDispatch();

  function onClick(e: string) {
    setCulture(e);
  }

  function onChange(e: any) {
    const {
      target: { value, name },
    } = e;
    if (name === "search") {
      setKeyword(value);
    } else if (name === "comment") {
      setComment(value);
    }
  }

  async function enterSearch(e: any) {
    setSearchResult([]);
    e.preventDefault();
    //영화
    if (culture === "movie") {
      const movieRes: any = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=ko&page=1&include_adult=true&query=${keyword}`
      ).catch((error) => console.log(error));
      const movieResObj: any = await movieRes.json();
      if (movieResObj.results.length !== 0) {
        setSearchResult(movieResObj.results);
      }
      //tv
    } else if (culture === "tv") {
      const tvRes = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${MOVIE_API_KEY}&language=ko&page=1&include_adult=true&query=${keyword}`
      );
      const tvResObj: any = await tvRes.json();
      if (tvResObj.results.length !== 0) {
        setSearchResult(tvResObj.results);
      }
    } else if (culture === "book") {
      const bookRes = await fetch(
        `https://dapi.kakao.com/v3/search/book?sort=accuracy&page=1&size=10&query=${keyword}`,
        {
          headers: {
            Authorization: "KakaoAK adf54a10d5089b5e92de6d43b3174a13",
          },
        }
      );
      const bookResObj = await bookRes.json();
      if (bookResObj.documents.length !== 0) {
        setSearchResult(bookResObj.documents);
      }
    }
  }
  async function enterPosting(e: any) {
    e.preventDefault();
    const userRef = doc(dbService, "user", userInfo.uid);
    let userDataTemp;

    if (userData !== undefined) {
      userDataTemp = {
        book: userData?.book,
        customOption: userData?.customOption,
        internationalMovie: userData?.internationalMovie,
        isCustom: userData?.isCustom,
        nickname: userData?.nickname,
        tv: userData.tv,
        isPrivate: userData.isPrivate,
      };
    }

    //영화
    if (culture === "moviePosting") {
      const movieRef = {
        id: chosenCulture.id,
        title: chosenCulture.title,
        poster: posterBaseURL + chosenCulture.poster_path,
        year: chosenCulture.release_date.substring(0, 4),
        comment: comment,
      };
      await updateDoc(userRef, {
        internationalMovie: arrayUnion(movieRef),
      });

      setCulture("movie");
      if (userDataTemp !== undefined) {
        userDataTemp.internationalMovie.push(movieRef);
      }

      dispatch(setUserData(userDataTemp));
    }
    //tv
    if (culture === "tvPosting") {
      const tvRef = {
        id: chosenCulture.id,
        title: chosenCulture.name,
        poster: posterBaseURL + chosenCulture.poster_path,
        year: chosenCulture.first_air_date.substring(0.4),
        comment: comment,
      };
      await updateDoc(userRef, {
        tv: arrayUnion(tvRef),
      });
      setCulture("tv");
      if (userDataTemp !== undefined) {
        userDataTemp.tv.push(tvRef);
      }

      dispatch(setUserData(userDataTemp));
    }
    //book
    if (culture === "bookPosting") {
      const bookRef = {
        id: chosenCulture.isbn,
        title: chosenCulture.title,
        poster: chosenCulture.thumbnail,
        year: chosenCulture.datetime.substring(0, 4),
        comment: comment,
      };
      await updateDoc(userRef, {
        book: arrayUnion(bookRef),
      });
      setCulture("book");
      if (userDataTemp !== undefined) {
        userDataTemp.book.push(bookRef);
      }

      dispatch(setUserData(userDataTemp));
    }
    setComment("");
  }

  async function thumnailClick(e: any) {
    setChosenCulture(e);
    //영화 등록할때
    if (culture === "movie") {
      const docRef = doc(dbService, "internationalMovie", String(e.id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCulture("moviePosting");
      } else {
        await setDoc(doc(dbService, "internationalMovie", String(e.id)), {
          Title: e.title,
          Poster: posterBaseURL + e.poster_path,
          Year: e.release_date.substring(0, 4),
          ID: e.id,
        });
        setCulture("moviePosting");
      }
    }
    //tv 등록할때
    if (culture === "tv") {
      const docRef = doc(dbService, "tv", String(e.id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCulture("tvPosting");
      } else {
        await setDoc(doc(dbService, "tv", String(e.id)), {
          Title: e.name,
          Poster: posterBaseURL + e.poster_path,
          Year: e.first_air_date.substring(0, 4),
          ID: e.id,
        });
        setCulture("tvPosting");
      }
    }
    //책 등록할때
    if (culture === "book") {
      const docRef = doc(dbService, "book", e.isbn);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCulture("bookPosting");
      } else {
        await setDoc(doc(dbService, "book", e.isbn), {
          Title: e.title,
          Poster: e.thumbnail,
          Year: e.datetime.substring(0, 4),
          ID: e.isbn,
        });
        setCulture("bookPosting");
      }
    }
  }

  return (
    <>
      <ModalWindow>
        <ModalHeader>새 기록</ModalHeader>
        <AnimatePresence>
          {
            {
              none: (
                <ModalBody>
                  <CultureBox onClick={() => onClick("movie")}>
                    <ContentsIcon src={movieIcon} />
                    <span>MOVIE</span>
                  </CultureBox>

                  <CultureBox onClick={() => onClick("tv")}>
                    <ContentsIcon src={tvIcon} />
                    <span style={{ minWidth: "51px" }}>TV </span>
                  </CultureBox>
                  <CultureBox onClick={() => onClick("book")}>
                    <ContentsIcon src={bookIcon} />
                    <span>BOOK</span>
                  </CultureBox>
                </ModalBody>
              ),
              movie: (
                <SearchContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <form onSubmit={enterSearch}>
                    <SearchInput
                      value={keyword}
                      onChange={onChange}
                      name="search"
                      required
                      placeholder="영화 검색"
                    />
                  </form>
                  <SearchResultContainer>
                    <ul>
                      {searchResultArr.length !== 0
                        ? searchResultArr.map((movie: any, index: number) => (
                            <SearchResult>
                              <ThumnailSmall
                                onClick={() => thumnailClick(movie)}
                                src={posterBaseURL + movie.poster_path}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                              <Title>{movie.title}</Title>
                            </SearchResult>
                          ))
                        : null}
                    </ul>
                  </SearchResultContainer>
                </SearchContainer>
              ),
              moviePosting: (
                <>
                  {chosenCulture !== undefined ? (
                    <PostingContainer
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <ThumnailContainer>
                        <ThumnailMedium
                          src={posterBaseURL + chosenCulture.poster_path}
                        />
                      </ThumnailContainer>
                      <InfoContainer>
                        <InfoBox>
                          <h1>{chosenCulture.title}</h1>{" "}
                          <small>({chosenCulture.release_date})</small>
                        </InfoBox>
                        <Desc>
                          2글자 이상의 짧은 코멘트를 입력해주세요
                          <p>추후 코멘트 관련 컨텐츠에 활용 됩니다.</p>
                        </Desc>
                        <form onSubmit={enterPosting}>
                          <CommentsInput
                            minLength={3}
                            maxLength={100}
                            placeholder="이 작품은 한마디로..."
                            value={comment}
                            name="comment"
                            onChange={onChange}
                            required
                          />
                          <SubmitBtn type="submit">기록</SubmitBtn>
                        </form>
                      </InfoContainer>
                    </PostingContainer>
                  ) : null}
                </>
              ),
              tv: (
                <SearchContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <form onSubmit={enterSearch}>
                    <SearchInput
                      value={keyword}
                      placeholder="TV프로그램 검색"
                      onChange={onChange}
                      name="search"
                      required
                    />
                  </form>
                  <SearchResultContainer>
                    <ul>
                      {searchResultArr.length !== 0
                        ? searchResultArr.map((tv: any, index: number) => (
                            <SearchResult>
                              <ThumnailSmall
                                onClick={() => thumnailClick(tv)}
                                src={posterBaseURL + tv.poster_path}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                              <Title>{tv.name}</Title>
                            </SearchResult>
                          ))
                        : null}
                    </ul>
                  </SearchResultContainer>
                </SearchContainer>
              ),
              tvPosting: (
                <>
                  {chosenCulture !== undefined ? (
                    <PostingContainer
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <ThumnailContainer>
                        <ThumnailMedium
                          src={posterBaseURL + chosenCulture.poster_path}
                        />
                      </ThumnailContainer>
                      <InfoContainer>
                        <InfoBox>
                          <h1>{chosenCulture.name}</h1>{" "}
                          <small>({chosenCulture.first_air_date})</small>
                        </InfoBox>
                        <Desc>
                          2글자 이상의 짧은 코멘트를 입력해주세요
                          <p>추후 코멘트 관련 컨텐츠에 활용 됩니다.</p>
                        </Desc>
                        <form onSubmit={enterPosting}>
                          <CommentsInput
                            maxLength={100}
                            placeholder="이 작품은 한마디로..."
                            value={comment}
                            name="comment"
                            onChange={onChange}
                            required
                          />
                          <SubmitBtn type="submit">기록</SubmitBtn>
                        </form>
                      </InfoContainer>
                    </PostingContainer>
                  ) : null}
                </>
              ),
              book: (
                <>
                  {" "}
                  <SearchContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <form onSubmit={enterSearch}>
                      <SearchInput
                        value={keyword}
                        onChange={onChange}
                        name="search"
                        placeholder="책 검색"
                        required
                      />
                    </form>
                    <SearchResultContainer>
                      <ul>
                        {searchResultArr.length !== 0
                          ? searchResultArr.map((book: any, index: number) => (
                              <SearchResult>
                                <ThumnailSmall
                                  onClick={() => thumnailClick(book)}
                                  src={book.thumbnail}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                />
                                <Title>{book.title}</Title>
                              </SearchResult>
                            ))
                          : null}
                      </ul>
                    </SearchResultContainer>
                  </SearchContainer>
                </>
              ),
              bookPosting: (
                <>
                  {chosenCulture !== undefined ? (
                    <PostingContainer
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <ThumnailContainer>
                        <ThumnailMedium src={chosenCulture.thumbnail} />
                      </ThumnailContainer>
                      <InfoContainer>
                        <InfoBox>
                          <h1>{chosenCulture.title}</h1>{" "}
                          <small>({chosenCulture.authors})</small>
                        </InfoBox>
                        <Desc>
                          2글자 이상의 짧은 코멘트를 입력해주세요
                          <p>추후 코멘트 관련 컨텐츠에 활용 됩니다.</p>
                        </Desc>
                        <form onSubmit={enterPosting}>
                          <CommentsInput
                            maxLength={100}
                            placeholder="이 작품은 한마디로..."
                            value={comment}
                            name="comment"
                            onChange={onChange}
                            required
                          />
                          <SubmitBtn type="submit">기록</SubmitBtn>
                        </form>
                      </InfoContainer>
                    </PostingContainer>
                  ) : null}
                </>
              ),
            }[culture]
          }
        </AnimatePresence>
      </ModalWindow>
    </>
  );
}

export default PostingModal;
