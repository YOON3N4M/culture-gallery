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
import { useNavigate, useOutletContext } from "react-router-dom";
import { Circle, ToggleBtn } from "./modal/SettingModal";
import { useDispatch } from "react-redux";
import { setModalOn } from "../module/store";

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
`;
const StyledSection = styled(motion.section)<{ isLast: boolean }>`
  margin-bottom: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.isLast ? "40vh" : "70vh")};
`;
const StyledImg = styled.img`
  width: 1024px;
  opacity: 30%;
  margin: 0 auto;
  display: block;
`;

const PosterBox = styled.div`
  margin: 0 auto;
  width: 1060px;
  margin-top: 30px;
`;

const TopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  //background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50vh;
`;

const StyledBtn = styled(motion.button)`
  width: 150px;
  height: 50px;
  border: 0.5px solid rgba(79, 79, 79, 0.668);
  border-radius: 8px;
  color: #a8a6a6;
  display: block;
  margin: 0 auto;
  margin-top: 80px;
  cursor: pointer;
  background-color: #161616;
  box-shadow: rgba(91, 97, 90, 0.668) 0px 0px 75px 5px;
`;

const ToggleBox = styled.div`
  margin: 0 auto;
  display: flex;
  color: white;
  width: 200px;

  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
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
  setSelectedWindow: any;
}

function Welcome() {
  const [dummy, setDummy] = useState<DummyT>();
  const [chosenContents, setChosenContents] = useState<Array<ContentsT>>();
  const [isBook, setIsBook] = useState(false);
  const { setSelectedWindow } = useOutletContext<Props>();
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getDummyData() {
    const dummyRef = doc(dbService, "user", "a7RVkbswbtaCikSCdJL8gKi9kOr1");
    const docSnap = await getDoc(dummyRef);
    if (docSnap.exists() && docSnap.data() !== undefined) {
      setDummy(docSnap.data());
    }
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: -300, transition: { duration: 0.7 } },
  };

  function goExplore() {
    navigate(`/explore`);
  }
  function goAuth() {
    dispatch(setModalOn("Auth"));
  }

  useEffect(() => {
    getDummyData();
  }, []);
  useEffect(() => {
    if (dummy !== undefined) {
      setChosenContents(dummy.internationalMovie);
    }
  }, [dummy]);

  useEffect(() => {
    setSelectedWindow(-1);
    // window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setTimeout(() => setToggle((prev) => !prev), 2000);
  }, [toggle]);
  return (
    <>
      <WelcomeModal>
        <AnimatePresence>
          <TopContainer>
            <TextSpan
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              fontSize="300%"
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
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.5 }}
              transition={{
                delay: 1,
                duration: 1,
              }}
            >
              <ArrowImage src={arrowIcon} />
            </ArrowImageBox>
          </TopContainer>
          {""}
          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            isLast={false}
          >
            <TextSpan fontSize="30px" marginTop="50px">
              <b>문화 생활을 기록해요.</b>
            </TextSpan>
            <TextSpan fontSize="20px" marginTop="25px">
              영화, TV프로그램, 책의 기록을 남길 수 있습니다.
            </TextSpan>
            <TextSpan fontSize="20px" marginTop="5px">
              경험했던 작품들을 검색해서 발견하고 기록으로 남겨보세요.
            </TextSpan>
            <PosterBox>
              <ContentsUl>
                {dummy?.internationalMovie.map((movie: ContentsT) => (
                  <Item>
                    <CollectionImg isBook={false} src={movie.poster} />
                  </Item>
                ))}
              </ContentsUl>
            </PosterBox>
          </StyledSection>

          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            isLast={false}
          >
            <TextSpan fontSize="30px" marginTop="50px">
              <b> 서로의 기록을 공유해요.</b>
            </TextSpan>
            <TextSpan fontSize="20px" marginTop="35px">
              내가 남긴 기록, 다른 사람들의 기록을 공유 할 수 있습니다.{" "}
            </TextSpan>
            <TextSpan fontSize="20px" marginTop="5px">
              <b style={{ fontSize: "25px" }}> " 아! 나도 이거 봤었는데! "</b>{" "}
              잊고 지냈던 작품들도 찾아보세요.
            </TextSpan>

            <StyledBtn onClick={goExplore}>컬렉션 둘러보기</StyledBtn>
            <TextSpan fontSize="20px" marginTop="70px">
              물론 혼자만의 기록으로 간직하고 싶다면 비공개 설정할 수 있습니다.
            </TextSpan>
            <ToggleBox>
              <span>컬렉션 비공개</span>
              <ToggleBtn toggle={toggle}>
                <Circle toggle={toggle} />
              </ToggleBtn>
            </ToggleBox>
            <TextSpan style={{ color: "gray" }} fontSize="15px" marginTop="8px">
              설정에서 확인해보세요! (기본 설정 : 비공개)
            </TextSpan>
          </StyledSection>

          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            isLast={false}
          >
            <TextSpan fontSize="30px" marginTop="35px">
              <b>기록을 남기고 저장하려면 로그인을 해야해요 !</b>
            </TextSpan>

            <StyledBtn onClick={goAuth}>로그인 하기</StyledBtn>
            <TextSpan fontSize="20px" marginTop="70px">
              아니면 . . .
            </TextSpan>
          </StyledSection>

          <StyledSection
            variants={variants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            isLast={true}
          >
            <TextSpan fontSize="30px" marginTop="20px">
              그냥 둘러보기 !
            </TextSpan>
            <StyledBtn onClick={goExplore}>둘러보기</StyledBtn>
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
