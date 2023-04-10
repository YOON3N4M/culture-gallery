import { doc, getDoc, setDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { dbService } from "../fBase";
import { CollectionImg, ContentsBody, ContentsUl, Item, Title } from "./Main";

const WelcomeModal = styled.div`
  width: 900px;
  height: 900px;
  position: absolute;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.78) 30%
  );
`;
const WelcomeTextContainer = styled(motion.div)`
  width: 500px;
  height: 300px;
  //background-color: white;
  margin: 0 auto;
  line-height: 300px;
  text-align: center;
  font-size: 25px;
  z-index: -400;
`;
interface ContentsT {
  id?: string;
  poster?: string;
  title?: string;
  year?: string;
}

interface DummyT {
  book?: any;
  internationalMovie?: any;
  tv?: any;
}
interface Props {
  isModal: boolean;
}

function Welcome({ isModal }: Props) {
  const [dummy, setDummy] = useState<DummyT>();
  const [chosenContents, setChosenContents] = useState<Array<ContentsT>>();
  const [isBook, setIsBook] = useState(false);
  const [blink, setBlink] = useState(true);
  async function getDummyData() {
    const dummyRef = doc(dbService, "user", "2iq902jOUIXtIi7OdljMw66DX1x1");
    const docSnap = await getDoc(dummyRef);
    if (docSnap.exists() && docSnap.data() !== undefined) {
      setDummy(docSnap.data());
    }
  }

  useEffect(() => {
    getDummyData();
  }, []);
  useEffect(() => {
    if (dummy !== undefined) {
      setChosenContents(dummy.internationalMovie);
    }
  }, [dummy]);

  return (
    <>
      <ContentsBody>
        <WelcomeModal>
          <AnimatePresence>
            <WelcomeTextContainer
              key="welcomeText"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              좌측 메뉴에서 로그인 후 이용 가능합니다.
            </WelcomeTextContainer>
          </AnimatePresence>
        </WelcomeModal>
        <ContentsUl>
          {chosenContents !== undefined ? (
            <>
              {chosenContents.map((item: ContentsT) => (
                <Item>
                  <CollectionImg src={item.poster} isBook={false} />
                  <Title isBook={false}>{item.title}</Title>
                </Item>
              ))}
            </>
          ) : null}
        </ContentsUl>
      </ContentsBody>
    </>
  );
}
export default Welcome;
