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

const Contianer = styled(motion.div)`
  padding-top: 50px;
  padding-bottom: 20px;
`;

const Logo = styled(motion.span)`
  font-size: 25px;
  display: block;
  margin-top: 50px;
  font-weight: 700;
`;

const AuthInput = styled.input`
  border: 0px;
  border-bottom: 3px solid #959595;
  outline: none;
  font-size: 20px;
  text-align: center;
  margin-bottom: 30px;
`;

const OR = styled.div`
  font-size: 17px;
  opacity: 70%;
  font-weight: 900;
`;
function AuthModal() {
  const [pageIndex, setPageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [user, setUser] = useState<any>({});
  const [isLocal, setIsLocal] = useState(false);
  const [nickname, setNickname] = useState("");

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
  async function onSubmit(e: any) {
    e.preventDefault();
    setPageIndex((prev) => prev + 1);
    setIsLocal(true);

    try {
      let data;
      if (isNew && pageIndex === 1) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        setUser(data.user);
      } else {
        //data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  async function onNicknameSubmit(e: any) {
    e.preventDefault();
    //계정 등록 직후 닉네임 설정
    await updateProfile(user, { displayName: nickname });
    // 이 부분 테스트 끝나면 book, kMovie, TV프로그램 등 만들어야함
    // 계정 생성시 기본 값들을 설정하는 곳
    await setDoc(doc(dbService, "user", user.uid), {
      isCustom: false,
      customOption: {},
      internationalMovie: [],
    }).then(() => setPageIndex((prev) => prev + 1));
  }

  return (
    <>
      <ModalWindow>
        <ModalHeader></ModalHeader>
        <Logo initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          CultureGallery
        </Logo>
        <AnimatePresence>
          {
            {
              0: (
                <Contianer key="emailIndex" exit={{ x: -500, opacity: 0 }}>
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
              1: (
                <Contianer
                  key="passwordIndex"
                  initial={{ opacity: 0, x: 400 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ease: easeIn }}
                  exit={{ x: -500, opacity: 0 }}
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
              2: (
                <Contianer
                  key="nicknameIndex"
                  initial={{ opacity: 0, x: 400 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ease: easeIn }}
                  exit={{ x: -500, opacity: 0 }}
                >
                  <form onSubmit={onNicknameSubmit}>
                    <AuthInput
                      onChange={onChange}
                      value={nickname}
                      type="text"
                      name="nickname"
                      placeholder="사용할 닉네임을 입력하세요!"
                      minLength={2}
                    />
                  </form>
                </Contianer>
              ),
              3: (
                <Contianer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: easeIn, duration: 1 }}
                >
                  <span>회원가입이 완료 되었습니다!</span>
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
