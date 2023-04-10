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
import { setModalOff, setSignIn, setUserData } from "../../module/store";

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
  //height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding-top: 40px;
`;
const AuthInput = styled.input`
  border: 0px;
  outline: none;
  width: 250px;
  height: 30px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
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
const ChangeBtn = styled.button`
  color: white;
  text-decoration: underline;
  font-size: 15px;
  margin-top: 30px;
  cursor: pointer;
`;
const SubmitBtn = styled.button`
  width: 250px;
  height: 30px;
  background-color: rgb(13, 13, 13);
  color: white;
  margin-top: 15px;
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

const Error = styled.span`
  font-size: 15px;
  color: #9b3333;
`;
const Notice = styled.span`
  font-size: 15px;
  color: #726b6b;
`;
const ErrorBox = styled.div`
  margin-top: 15px;
  height: 18px;
  width: 100%;
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
  const [errorMsg, setErrorMsg] = useState("");
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
    setErrorMsg("");
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
      switch (error.message) {
        case "Firebase: Error (auth/user-not-found).":
          setErrorMsg("존재하지 않는 계정 입니다.");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setErrorMsg("잘못된 비밀번호 입니다.");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          setErrorMsg("이미 사용중인 이메일 입니다.");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setErrorMsg("비밀번호는 최소 6자리 이상이여야 합니다.");
          break;
        default:
          break;
      }
    }
  }

  async function onNicknameSubmit(e: any) {
    e.preventDefault();
    //계정 등록 직후 닉네임 설정
    await updateProfile(user, { displayName: nickname });
    // 이 부분 테스트 끝나면 book, kMovie, TV프로그램 등 만들어야함 (완료)
    // 계정 생성시 기본 값들을 설정하는 곳
    const userDataTemp = {
      nickname: nickname,
      isPrivate: true,
      isCustom: false,
      customOption: {},
      internationalMovie: [],
      tv: [],
      book: [],
    };
    await setDoc(doc(dbService, "user", user.uid), userDataTemp).then(() =>
      setPageIndex((prev) => prev + 1)
    );

    dispatch(setSignIn());
    dispatch(setUserData(userDataTemp));
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
                        <SubmitBtn type="submit">로그인</SubmitBtn>
                      </form>
                      <ErrorBox>
                        <Error>{errorMsg}</Error>
                      </ErrorBox>
                      <ErrorBox></ErrorBox>
                      <ChangeBtn onClick={() => onClick(1)}>
                        회원가입 하러가기
                      </ChangeBtn>
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
                        <SubmitBtn type="submit">회원가입</SubmitBtn>
                        <ErrorBox>
                          <Error>{errorMsg}</Error>
                        </ErrorBox>
                        <ErrorBox>
                          <Notice>별도의 인증 절차는 없습니다!</Notice>
                        </ErrorBox>
                      </form>
                      <ChangeBtn onClick={() => onClick(0)}>
                        로그인 하러가기
                      </ChangeBtn>
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
                    <span>
                      회원가입이 완료 되었습니다! 새로고침 해주세요(추후 수정
                      예정)
                    </span>
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
