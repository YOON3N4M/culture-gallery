import { AnimatePresence, easeIn, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { ModalWindow, ModalHeader } from "./Modal";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth, dbService } from "../../fBase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setModalOff } from "../../module/store";

const Contianer = styled(motion.div)`
  padding-top: 50px;
  padding-bottom: 20px;
`;

const Logo = styled(motion.span)`
  font-size: 17px;
  display: block;

  font-weight: 700;
`;
const InputContainer = styled(motion.div)`
  //background-color: red;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;
const AuthInput = styled.input`
  border: 0px;
  outline: none;
  width: 250px;
  height: 30px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 30px;
  background-color: rgb(26, 26, 26);
  color: white;
`;
const NickInput = styled.input`
  border: 0px;
  outline: none;
  width: 250px;
  height: 30px;
  font-size: 20px;
  text-align: center;

  background-color: rgb(26, 26, 26);
  color: white;
`;

const OR = styled.div`
  font-size: 17px;
  opacity: 70%;
  font-weight: 900;
`;

const LoginSpan = styled.span`
  display: block;
  opacity: 60%;
  margin-bottom: 40px;
`;
const LoginBtn = styled.button`
  color: white;
  text-decoration: underline;
  font-size: 15px;
  margin-top: 30px;
  cursor: pointer;
`;
const SubmitBtn = styled.button`
  position: absolute;
  width: 0px;
  height: 0px;
`;
const NickBox = styled(motion.div)`
  width: 280px;
  height: 200px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
`;

interface Props {
  modalOff: any;
}

function AuthModal({ modalOff }: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [user, setUser] = useState<any>({});
  const [isLocal, setIsLocal] = useState(false);
  const [nickname, setNickname] = useState("");

  const dispatch = useDispatch();
  function onChange(e: any) {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  }
  function onClick(i: number) {
    setPageIndex(i);
    setIsNew((prev) => !prev);
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    setIsLocal(true);

    try {
      let data;
      if (isNew) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        setUser(data.user);
        setPageIndex((prev) => prev + 1);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
        dispatch(setModalOff());
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async function onNicknameSubmit(e: any) {
    e.preventDefault();
    //계정 등록 직후 닉네임 설정
    await updateProfile(user, { displayName: nickname });
    // 이 부분 테스트 끝나면 book, kMovie, TV프로그램 등 만들어야함 (완료)
    // 계정 생성시 기본 값들을 설정하는 곳
    await setDoc(doc(dbService, "user", user.uid), {
      nickname: nickname,
      isCustom: false,
      customOption: {},
      internationalMovie: [],
      tv: [],
      book: [],
    }).then(() => setPageIndex((prev) => prev + 1));
  }

  return (
    <>
      <ModalWindow>
        <ModalHeader>
          {" "}
          <Logo initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            CultureGallery
          </Logo>
        </ModalHeader>

        <AnimatePresence>
          {
            {
              0: (
                <>
                  <Contianer
                    key="loginIndex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <InputContainer>
                      <LoginSpan>로그인</LoginSpan>
                      <form onSubmit={onSubmit}>
                        <AuthInput
                          onChange={onChange}
                          value={email}
                          type="email"
                          name="email"
                          placeholder="이메일"
                          required
                        ></AuthInput>

                        <AuthInput
                          onChange={onChange}
                          value={password}
                          type="password"
                          name="password"
                          required
                          placeholder="비밀번호"
                        ></AuthInput>
                        <SubmitBtn type="submit"></SubmitBtn>
                      </form>
                      <LoginBtn onClick={() => onClick(1)}>
                        회원가입 하기
                      </LoginBtn>
                    </InputContainer>
                  </Contianer>
                </>
              ),
              1: (
                <>
                  <Contianer
                    key="regiIndex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <InputContainer>
                      <LoginSpan>회원가입</LoginSpan>
                      <form onSubmit={onSubmit}>
                        <AuthInput
                          onChange={onChange}
                          value={email}
                          type="email"
                          name="email"
                          required
                          placeholder="이메일"
                        />
                        <AuthInput
                          onChange={onChange}
                          value={password}
                          type="password"
                          name="password"
                          required
                          placeholder="비밀번호"
                        />
                        <SubmitBtn type="submit"></SubmitBtn>
                      </form>
                      <LoginBtn onClick={() => onClick(0)}>
                        로그인 하기
                      </LoginBtn>
                    </InputContainer>
                  </Contianer>
                </>
              ),
              2: (
                <NickBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form onSubmit={onNicknameSubmit}>
                    <NickInput
                      onChange={onChange}
                      value={nickname}
                      type="text"
                      name="nickname"
                      placeholder="사용할 닉네임을 입력하세요!"
                      minLength={2}
                    />
                  </form>
                </NickBox>
              ),
              3: (
                <>
                  {" "}
                  <NickBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>회원가입이 완료 되었습니다!</span>
                  </NickBox>
                </>
              ),
              10: (
                <Contianer key="emailIndex" exit={{ opacity: 0 }}>
                  <form onSubmit={onSubmit}>
                    <AuthInput
                      onChange={onChange}
                      value={email}
                      type="email"
                      name="email"
                      placeholder="이메일로 가입하기!"
                      required
                    ></AuthInput>
                  </form>
                  <OR>OR</OR>
                </Contianer>
              ),
              9: (
                <Contianer
                  key="passwordIndex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: easeIn }}
                  exit={{ opacity: 0 }}
                >
                  <form onSubmit={onSubmit}>
                    <AuthInput
                      onChange={onChange}
                      value={password}
                      type="password"
                      name="password"
                      placeholder="비밀번호를 입력하세요!"
                      required
                    ></AuthInput>
                  </form>
                </Contianer>
              ),

              12: (
                <Contianer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: easeIn, duration: 1 }}
                >
                  <NickBox>
                    {" "}
                    <span>회원가입이 완료 되었습니다!</span>
                  </NickBox>
                </Contianer>
              ),
            }[pageIndex]
          }
        </AnimatePresence>
      </ModalWindow>
    </>
  );
}

export default AuthModal;
