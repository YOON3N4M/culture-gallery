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

  display: flex;
  background-color: #727272;
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
`;
const ThumnailMedium = styled.img`
  width: 200px;
`;

const Title = styled.span`
  font-size: 20px;
  display: block;
  text-align: center;
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
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

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
        `http://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&t=${keyword}`
      ).catch((error) => console.log(error));
      const movieInfo: MovieInfoT = await movieRes.json();
      if (movieInfo.Poster) {
        setSearchResult((prev: any) => [...prev, movieInfo]);
        console.log(movieInfo);
      }
    }
  }
  async function enterPosting(e: any) {
    e.preventDefault();
    const userRef = doc(dbService, "user", userInfo.uid);
    await updateDoc(userRef, {
      internationalMovie: arrayUnion(chosenCulture.imdbID),
    });
    console.log(userInfo);
  }

  async function thumnailClick(e: any) {
    setChosenCulture(e);
    //해외영화 등록할때
    if (culture === "movie") {
      const docRef = doc(dbService, "internationalMovie", e.imdbID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("이미 등록된 영화 입니다!", docSnap.data());
      } else {
        await setDoc(doc(dbService, "internationalMovie", e.imdbID), {
          Title: e.Title,
          Poster: e.Poster,
          Genre: e.Genre,
          Year: e.Year,
          imdbID: e.imdbID,
        });
      }
    }
    setCulture("posting");
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
                    placeholder="Harry potter..."
                    onChange={onChange}
                    name="search"
                    required
                  />
                </form>
                <SearchResultContainer>
                  {searchResultArr.length !== 0
                    ? searchResultArr.map((movie: any) => (
                        <ul>
                          <SearchResult>
                            <ThumnailSmall
                              onClick={() => thumnailClick(movie)}
                              src={movie.Poster}
                            />
                          </SearchResult>
                        </ul>
                      ))
                    : null}
                </SearchResultContainer>
              </SearchContainer>
            ),
            posting: (
              <>
                {chosenCulture !== undefined ? (
                  <PostingContainer>
                    <ThumnailContainer>
                      <ThumnailMedium src={chosenCulture.Poster} />
                    </ThumnailContainer>
                    <InfoContainer>
                      <InfoBox>
                        <h1>{chosenCulture.Title}</h1>{" "}
                        <small>({chosenCulture.Year})</small>
                      </InfoBox>
                      <InfoBox>
                        <Genre>{chosenCulture.Genre}</Genre>
                      </InfoBox>
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
