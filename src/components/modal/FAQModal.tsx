import { useState } from "react";
import styled from "styled-components";
import { ModalHeader, ModalWindow } from "./Modal";

const DescContainer = styled.div`
  //background-color: red;
  width: 400px;
  height: 200px;
  margin: 0 auto;
  padding-top: 30px;
`;

function FAQModal() {
  const [index, setIndex] = useState(0);
  return (
    <>
      {
        {
          0: (
            <ModalWindow>
              <ModalHeader>도움말</ModalHeader>
              <DescContainer>
                현재 기록 삭제 기능은 수정중에 있습니다.
              </DescContainer>
            </ModalWindow>
          ),
        }[index]
      }
    </>
  );
}
export default FAQModal;
