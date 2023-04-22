import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  AnimatePresence,
  motion,
  MotionValue,
  scroll,
  useScroll,
  useTransform,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { dbService } from "../fBase";
import { CollectionImg, ContentsBody, ContentsUl, Item, Title } from "./Main";
import arrowIcon from "../img/arrowIcon.png";
import dummyImg from "../img/dummy.jpeg";

const WelcomeModal = styled.div`
  top: 0;
  width: 100vw;

  position: absolute;
  background: black;
  border-radius: 8px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
`;
const TextSpan = styled(motion.span)<{ fontSize: string; marginTop: string }>`
  //background-color: white;
  margin: 0 auto;
  text-align: center;
  font-size: ${(Props) => Props.fontSize};
  color: white;
  display: block;
  margin-top: ${(Props) => Props.marginTop};
`;

const ArrowImage = styled.img`
  margin: 0 auto;

  width: 30px;
  transform: rotate(270deg);
`;
const ArrowImageBox = styled(motion.div)`
  margin: 0 auto;
  margin-top: 40px;
`;
const StyledSection = styled(motion.section)`
  margin-bottom: 200px;
  position: relative;
`;
const StyledImg = styled.img`
  position: absolute;
  width: 1024px;
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

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Welcome() {
  const [dummy, setDummy] = useState<DummyT>();
  const [chosenContents, setChosenContents] = useState<Array<ContentsT>>();
  const [isBook, setIsBook] = useState(false);

  async function getDummyData() {
    const dummyRef = doc(dbService, "user", "a7RVkbswbtaCikSCdJL8gKi9kOr1");
    const docSnap = await getDoc(dummyRef);
    if (docSnap.exists() && docSnap.data() !== undefined) {
      setDummy(docSnap.data());
    }
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
      <WelcomeModal>
        <AnimatePresence>
          <TextSpan
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            fontSize="40px"
            marginTop="0px"
          >
            Culture Gallery
          </TextSpan>
          <TextSpan
            key="scrollMsg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1 }}
            fontSize="20px"
            marginTop="20px"
          >
            아래로 스크롤
          </TextSpan>
          <ArrowImageBox
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ delay: 1.2, duration: 1.2 }}
          >
            <ArrowImage src={arrowIcon} />
          </ArrowImageBox>

          <StyledSection initial="hidden" whileInView="visible">
            <StyledImg src={dummyImg} />
            <TextSpan fontSize="30px" marginTop="50px">
              문화 생활을 기록해요
            </TextSpan>
            <TextSpan fontSize="20px" marginTop="35px">
              영화, TV프로그램, 책의 기록을 남길 수 있습니다.
            </TextSpan>
          </StyledSection>

          <StyledSection>
            <TextSpan fontSize="30px" marginTop="50px">
              서로의 기록을 공유해요
            </TextSpan>
            <TextSpan fontSize="20px" marginTop="35px">
              내가 남긴 기록, 다른 사람들의 기록을 공유 할 수 있습니다.{" "}
              <b style={{ fontSize: "25px" }}> " 아! 나도 이거 봤었는데! "</b>{" "}
              잊고 있던 작품들을 찾아보세요
            </TextSpan>
          </StyledSection>

          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
          >
            <TextSpan fontSize="30px" marginTop="35px">
              variants test
            </TextSpan>
            <TextSpan fontSize="15px" marginTop="20px">
              아니면
            </TextSpan>
            <TextSpan fontSize="30px" marginTop="20px">
              그냥 둘러보기
            </TextSpan>
          </StyledSection>

          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
          >
            <TextSpan fontSize="30px" marginTop="35px">
              variants test
            </TextSpan>
            <TextSpan fontSize="15px" marginTop="20px">
              아니면
            </TextSpan>
            <TextSpan fontSize="30px" marginTop="20px">
              그냥 둘러보기
            </TextSpan>
          </StyledSection>
          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
          >
            <TextSpan fontSize="30px" marginTop="35px">
              variants test
            </TextSpan>
            <TextSpan fontSize="15px" marginTop="20px">
              아니면
            </TextSpan>
            <TextSpan fontSize="30px" marginTop="20px">
              그냥 둘러보기
            </TextSpan>
          </StyledSection>
          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
          >
            <TextSpan fontSize="30px" marginTop="35px">
              variants test
            </TextSpan>
            <TextSpan fontSize="15px" marginTop="20px">
              아니면
            </TextSpan>
            <TextSpan fontSize="30px" marginTop="20px">
              그냥 둘러보기
            </TextSpan>
          </StyledSection>
        </AnimatePresence>
      </WelcomeModal>
      {/* <ContentsUl>
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
      </ContentsUl> */}
    </>
  );
}
export default Welcome;
