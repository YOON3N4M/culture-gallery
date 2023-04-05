import { useDispatch } from "react-redux";
import styled from "styled-components";
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

function Main() {
  const dispatch = useDispatch();
  // 이 부분 해외 영화 검색 (영어로만 가능)

  function callModal(e: string) {
    dispatch(setModalOn(e));
  }

  return (
    <>
      <ContentsHeader>
        <Add
          onClick={() => {
            callModal("Posting");
          }}
        ></Add>
      </ContentsHeader>
      <ContentsBody></ContentsBody>
    </>
  );
}

export default Main;
