import { useState } from "react";
import styled from "styled-components";
import { ModalHeader, ModalWindow } from "./Modal";

const DescContainer = styled.div`
  //background-color: red;
  width: 400px;
  height: 200px;
  margin: 0 auto;
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
              <DescContainer></DescContainer>
            </ModalWindow>
          ),
        }[index]
      }
    </>
  );
}
export default FAQModal;
