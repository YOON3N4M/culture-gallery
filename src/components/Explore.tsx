import { collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { dbService } from "../fBase";

const ContentsBody = styled.div`
  width: 1060px;
  margin: 0 auto;
  z-index: 300;
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled(motion.div)`
  margin: 0 auto;
  margin-top: 50px;
  //background-color: red;
  width: 902px;
  height: 500px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px #e3e3e3 solid;
`;

const UserHeader = styled.div`
  width: 100%;
  height: 70px;
  background-color: white;
  color: black;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px #e3e3e3 solid;
`;

const ContentsWrap = styled.div`
  width: 900;
  height: 430px;
  display: flex;
  background-color: #ebeef1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;
const ContentsBox = styled.div`
  width: 289px;

  background-color: white;
  border-radius: 8px;
`;
const ContentsHeader = styled.div`
  width: 100%;
  height: 50px;
  //background-color: green;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  //box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;
const Contents = styled.div`
  width: 100%;
  height: 350px;
  //background-color: orange;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow-y: hidden;
  flex-wrap: wrap;
  padding: 5px;
  background-color: #e2e2e2;
  box-shadow: inset 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const UserIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #c0c0c0;
  border-radius: 50%;
  line-height: 50px;
  font-size: 25px;
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
`;
const Nickname = styled.h2`
  cursor: pointer;
`;
const Poster = styled.img`
  width: 89px;
  height: 128.4px;
  border-radius: 8px;
  margin-right: 1px;
  margin-left: 2px;
`;

export interface UserT {
  internationalMovie: any;
  tv: any;
  book: any;
  nickname: string;
  isPrivate: boolean;
  isCustom: boolean;
  customOption: any;
}

type UserArrT = Array<UserT>;

export interface ContentsT {
  id: string;
  poster: string;
  title: string;
  year: string;
  comment?: string;
}
interface Props {
  setIsMine: any;
  setSelectedWindow: any;
  setSelectedUser: any;
}

function Explore() {
  const [userArr, setUserArr] = useState<UserArrT>([]);
  const { setIsMine, setSelectedWindow, setSelectedUser } =
    useOutletContext<Props>();
  const navigate = useNavigate();
  async function getUserFromDB() {
    let docTemp: any = [];
    const q = query(
      collection(dbService, "user"),
      where("isPrivate", "==", false)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => docTemp.push(doc.data()));

    setUserArr(docTemp);
  }

  function goToMain(user: UserT) {
    setIsMine(false);
    setSelectedWindow(1);
    setSelectedUser(user);
    navigate(`/${user.nickname}`);
  }

  useEffect(() => {
    getUserFromDB();
  }, []);

  console.log(userArr);
  return (
    <>
      <ContentsBody>
        {userArr.length !== 0
          ? userArr.map((user: UserT) => (
              <>
                <UserContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <UserHeader>
                    <UserIcon onClick={() => goToMain(user)}>
                      {user.nickname.slice(0, 1)}
                    </UserIcon>{" "}
                    <Nickname onClick={() => goToMain(user)}>
                      {user.nickname}
                    </Nickname>
                  </UserHeader>
                  <ContentsWrap>
                    <ContentsBox>
                      <ContentsHeader>MOVIE</ContentsHeader>
                      <Contents>
                        {user.internationalMovie.map((movie: ContentsT) => (
                          <Poster src={movie.poster} />
                        ))}
                      </Contents>
                    </ContentsBox>
                    <ContentsBox>
                      <ContentsHeader>TV</ContentsHeader>
                      <Contents>
                        {user.tv.map((tv: ContentsT) => (
                          <Poster src={tv.poster} />
                        ))}
                      </Contents>
                    </ContentsBox>
                    <ContentsBox>
                      <ContentsHeader>BOOK</ContentsHeader>
                      <Contents>
                        {user.book.map((book: ContentsT) => (
                          <Poster src={book.poster} />
                        ))}
                      </Contents>
                    </ContentsBox>
                  </ContentsWrap>
                </UserContainer>
              </>
            ))
          : null}
      </ContentsBody>
    </>
  );
}
export default Explore;
