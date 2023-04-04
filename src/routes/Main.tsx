import styled from "styled-components";

const ContentsHeader = styled.div`
  width: 1000px;
  height: 50px;
  //background-color: blue;
  display: flex;
  justify-content: right;
  align-items: center;
  position: fixed;
  z-index: 100;
`;
const Add = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  margin-right: 20px;
`;

const ContentsBody = styled.div`
  background-color: blue;
  height: 50px;
  width: 900px;
  margin: 0 auto;
  z-index: 300;
  padding-top: 50px;
`;

const Buttonn = styled.button`
  cursor: pointer;
`;

interface MovieInfoT {
  Genre: string;
  Poster: string;
  Title: string;
  Year: string;
}

function Main() {
  // 이 부분 해외 영화 검색 (영어로만 가능)
  const movieName = "harry potter ";
  const MOVIE_API_KEY = "dc95ea84";

  async function getMovieFromAPI() {
    const movieRes: any = await fetch(
      `http://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&t=${movieName}`
    ).catch((error) => console.log(error));
    const movieInfo: MovieInfoT = await movieRes.json();
    console.log(movieInfo);
  }

  return (
    <>
      <ContentsHeader>
        <Add></Add>
      </ContentsHeader>
      <ContentsBody>
        <Buttonn onClick={getMovieFromAPI}>api</Buttonn>
      </ContentsBody>
    </>
  );
}

export default Main;
