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

const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px 10px 10px 20px;
`;
const CultureBox = styled.div`
  width: 125px;
  height: 125px;
  background-color: gray;
  border-radius: 30px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  width: 800px;
  height: 500px;
  padding: 100px 0px 100px 0px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  font-size: 30px;
  border-bottom: 2px solid gray;
`;
const SearchResultContainer = styled.div`
  margin-top: 50px;
  height: 250px;

  //background-color: #727272;
  justify-items: center;
  overflow: scroll;
  justify-content: center;
`;

const SearchResult = styled.li`
  width: 200px;
  height: 250px;
  justify-content: center;
  text-align: center;
`;
const ThumnailSmall = styled.img`
  width: 149px;
  height: 220px;
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
`;
const ThumnailMedium = styled.img`
  width: 200px;
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
`;

const Title = styled.span`
  width: 200px;
  white-space: nowrap;
  font-size: 15px;
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  color: gray;
  font-weight: 700;
`;

const PostingContainer = styled.div`
  align-items: center;
  width: 800px;
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

const Genre = styled.span`
  color: gray;
`;

const CommentsInput = styled.input`
  width: 400px;
  height: 30px;
  font-size: 20px;
  margin-top: 40px;
  // background-color: gray;

  border-bottom: 2px solid gray;
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
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.store.userInfo,
  }));

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
      console.log(movieResObj);
      if (movieResObj.results.length !== 0) {
        setSearchResult(movieResObj.results);
      }
      //tv
    } else if (culture === "tv") {
      const tvRes = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${MOVIE_API_KEY}&language=ko&page=1&include_adult=true&query=${keyword}`
      );
      const tvResObj: any = await tvRes.json();
      console.log(tvResObj);
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
      console.log(bookResObj);
    }
  }
  async function enterPosting(e: any) {
    e.preventDefault();
    const userRef = doc(dbService, "user", userInfo.uid);
    //영화
    if (culture === "moviePosting") {
      await updateDoc(userRef, {
        internationalMovie: arrayUnion(chosenCulture.id),
      });
      setCulture("movie");
    }
    //tv
    if (culture === "tvPosting") {
      await updateDoc(userRef, {
        tv: arrayUnion(chosenCulture.id),
      });
      setCulture("tv");
    }
    //book
    if (culture === "bookPosting") {
      await updateDoc(userRef, {
        book: arrayUnion(chosenCulture.isbn),
      });
      setCulture("book");
    }
    setComment("");
  }

  async function thumnailClick(e: any) {
    setChosenCulture(e);
    console.log(typeof e.id);
    //영화 등록할때
    if (culture === "movie") {
      const docRef = doc(dbService, "internationalMovie", String(e.id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("이미 등록된 영화 입니다!", docSnap.data());
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
        console.log("이미 등록된 tv프로그램 입니다!", docSnap.data());
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
        console.log("이미 등록된 책 입니다!", docSnap.data());
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
        <ModalHeader></ModalHeader>
        {
          {
            none: (
              <ModalBody>
                <CultureBox onClick={() => onClick("movie")}>영화</CultureBox>
                <CultureBox onClick={() => onClick("book")}>책</CultureBox>
                <CultureBox onClick={() => onClick("tv")}>
                  TV 프로그램
                </CultureBox>
              </ModalBody>
            ),
            movie: (
              <SearchContainer>
                <form onSubmit={enterSearch}>
                  <SearchInput
                    value={keyword}
                    placeholder=""
                    onChange={onChange}
                    name="search"
                    required
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
                            />
                            <Title>{movie.name}</Title>
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
                  <PostingContainer>
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
                      <InfoBox></InfoBox>
                      <form onSubmit={enterPosting}>
                        <CommentsInput
                          maxLength={100}
                          placeholder="이 작품은 한마디로..."
                          value={comment}
                          name="comment"
                          onChange={onChange}
                          required
                        />
                      </form>
                    </InfoContainer>
                  </PostingContainer>
                ) : null}
              </>
            ),
            tv: (
              <SearchContainer>
                <form onSubmit={enterSearch}>
                  <SearchInput
                    value={keyword}
                    placeholder=""
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
                  <PostingContainer>
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
                      <InfoBox></InfoBox>
                      <form onSubmit={enterPosting}>
                        <CommentsInput
                          maxLength={100}
                          placeholder="이 작품은 한마디로..."
                          value={comment}
                          name="comment"
                          onChange={onChange}
                          required
                        />
                      </form>
                    </InfoContainer>
                  </PostingContainer>
                ) : null}
              </>
            ),
            book: (
              <>
                {" "}
                <SearchContainer>
                  <form onSubmit={enterSearch}>
                    <SearchInput
                      value={keyword}
                      placeholder=""
                      onChange={onChange}
                      name="search"
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
                  <PostingContainer>
                    <ThumnailContainer>
                      <ThumnailMedium src={chosenCulture.thumbnail} />
                    </ThumnailContainer>
                    <InfoContainer>
                      <InfoBox>
                        <h1>{chosenCulture.title}</h1>{" "}
                        <small>
                          ({chosenCulture.datetime.substring(0, 4)})
                        </small>
                      </InfoBox>
                      <InfoBox></InfoBox>
                      <form onSubmit={enterPosting}>
                        <CommentsInput
                          maxLength={100}
                          placeholder="이 작품은 한마디로..."
                          value={comment}
                          name="comment"
                          onChange={onChange}
                          required
                        />
                      </form>
                    </InfoContainer>
                  </PostingContainer>
                ) : null}
              </>
            ),
          }[culture]
        }
      </ModalWindow>
    </>
  );
}

export default PostingModal;
