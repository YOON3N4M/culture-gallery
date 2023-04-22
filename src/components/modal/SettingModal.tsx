import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { dbService } from "../../fBase";
import { ModalHeader, ModalWindow } from "./Modal";

const SettingItem = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0px 50px 0px 50px;
  align-items: center;
  margin-top: 15px;
`;

export const ToggleBtn = styled.button<{ toggle: boolean }>`
  width: 60px;
  height: 25px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    !props.toggle ? "rgb(114,114,114)" : "#21a439"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
export const Circle = styled.div<{ toggle: boolean }>`
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(34px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

function SettingModal() {
  const { userInfo, userData } = useSelector((state: any) => ({
    userData: state.store.userData,
    userInfo: state.store.userInfo,
  }));
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);

  async function clickedToggle() {
    const ref = doc(dbService, "user", userInfo.uid);
    if (toggle) {
      await updateDoc(ref, {
        isPrivate: false,
      });
    } else if (toggle === false) {
      await updateDoc(ref, {
        isPrivate: true,
      });
    }
    setToggle((prev) => !prev);
  }

  useEffect(() => {
    if (userData !== undefined) {
      setToggle(userData.isPrivate);
    }
  }, []);

  return (
    <>
      <ModalWindow>
        <ModalHeader></ModalHeader>
        <SettingItem>
          <span>컬렉션 비공개</span>
          <ToggleBtn onClick={clickedToggle} toggle={toggle}>
            <Circle toggle={toggle} />
          </ToggleBtn>
        </SettingItem>
      </ModalWindow>
    </>
  );
}

export default SettingModal;
