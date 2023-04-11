import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../../fBase";
import { ModalHeader, ModalWindow } from "./Modal";

const UserContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: scroll;
`;
const UserBox = styled.div`
  width: 100%;
  height: 80px;
  //background-color: white;
  border-bottom: 0.5px solid #848484;
  display: flex;
  align-items: center;
  padding: 0px 30px 0px 30px;
  justify-content: space-between;
  cursor: pointer;
`;

const UserIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: gray;
  border-radius: 50%;
  line-height: 60px;
  font-size: 30px;
`;
const UserNameBox = styled.div`
  margin-left: -130px;
  width: 200px;
  height: 50px;
  //background-color: red;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const UserName = styled.span`
  // background-color: blue;
  font-size: 22px;
`;
const UserSmall = styled.span`
  // background-color: green;
  display: block;
  font-size: 13px;
  color: gray;
  margin-top: 5px;
`;
const UserCollection = styled.div``;

interface Props {
  setIsExplore: any;
  setSelectedUser: any;
}
function ExploreModal({ setIsExplore, setSelectedUser }: Props) {
  const [userArr, setUserArr] = useState([]);

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

  function onClick(u: any) {
    if (setSelectedUser !== undefined) {
      setSelectedUser(u);
    }
    if (setIsExplore !== undefined) {
      setIsExplore(true);
    }
  }

  useEffect(() => {
    getUserFromDB();
  }, []);
  return (
    <>
      <ModalWindow>
        <ModalHeader>컬렉션 탐색</ModalHeader>
        <UserContainer>
          {userArr.length !== 0
            ? userArr.map((u: any) => (
                <UserBox>
                  <UserIcon>{u.nickname.slice(0, 1)}</UserIcon>
                  <UserNameBox onClick={onClick}>
                    <UserName>{u.nickname}</UserName>
                    <UserSmall>
                      MOVIE {u.internationalMovie.length} | TV {u.tv.length} |
                      BOOK {u.book.length}
                    </UserSmall>
                  </UserNameBox>
                  <UserCollection>
                    {u.book.length + u.tv.length + u.internationalMovie.length}{" "}
                    기록
                  </UserCollection>
                </UserBox>
              ))
            : null}
        </UserContainer>
      </ModalWindow>
    </>
  );
}

export default ExploreModal;
