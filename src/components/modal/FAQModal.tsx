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
              <ModalHeader>CultureGallery</ModalHeader>
              <DescContainer>
                <p>컬처 갤러리는 문화생활 기록 서비스 입니다. </p>
                <p>
                  {" "}
                  현재는 영화, 책, TV 프로그램과 같은 컨텐츠 들의 검색, 기록을
                  지원하고 있습니다.
                </p>
                <p>
                  홈 화면에서 좌측으로 마우스를 옮기면 네비게이션이 보여집니다.
                </p>
                <p>
                  현재는 네비게이션 내 물음표가 있는 원을 누르면 로그인 화면이
                  보여집니다.
                </p>
                <p>
                  기본적으로 로그인 후 기록을 할 수 있으며 현재는 다른 사람의
                  기록을 구경하는 기능이 미지원 상태입니다.
                </p>
              </DescContainer>
            </ModalWindow>
          ),
        }[index]
      }
    </>
  );
}
export default FAQModal;
