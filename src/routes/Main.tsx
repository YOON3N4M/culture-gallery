import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dbService } from "../fBase";
import { setModalOn } from "../module/store";

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
  cursor: pointer;
`;

const ContentsBody = styled.div`
  //background-color: red;
  width: 900px;
  margin: 0 auto;
  z-index: 300;
  padding-top: 50px;
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

const CollectionImg = styled.img`
  width: 150px;
  height: 250px;
  margin: 15px 15px 15px 15px;
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
`;
function Main() {
  const dispatch = useDispatch();
  const [internationalMovie, setInternationMovie] = useState<any>([]);
  const [book, setBook] = useState([]);
  const { userData } = useSelector((state: any) => ({
    userData: state.store.userData,
  }));

  function callModal(e: string) {
    dispatch(setModalOn(e));
  }

  async function getCultureFromDB(item: any) {
    //영화 가져오기
    const movieID = String(item);
    const interMovieRef = doc(dbService, "internationalMovie", movieID);
    const docSnap = await getDoc(interMovieRef);
    if (docSnap.exists()) {
      const docSnapData = docSnap.data();
      setInternationMovie((prev: any) => [...prev, docSnapData]);
    }
  }

  useEffect(() => {
    setInternationMovie([]);
    if (userData) {
      userData.internationalMovie.map((item: any) => getCultureFromDB(item));
    }
  }, [userData]);

  return (
    <>
      <ContentsHeader>
        <Add
          onClick={() => {
            callModal("Posting");
          }}
        ></Add>
      </ContentsHeader>
      <ContentsBody>
        <ContentsUl>
          {internationalMovie.length !== 0
            ? internationalMovie.map((item: any) => (
                <CollectionImg src={item.Poster}></CollectionImg>
              ))
            : null}
        </ContentsUl>
      </ContentsBody>
    </>
  );
}

export default Main;
