import styled from "styled-components";
import logoImg from "../img/1.png";

const Tab = styled.div`
  width: 100vw;
  height: 50px;
  background-color: #181823;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const FAQ = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: white;
  opacity: 50%;
  cursor: pointer;
`;

const Logo = styled.span`
  color: white;
  font-weight: 900;
  opacity: 50%;
  cursor: pointer;
`;
const LogoImg = styled.img`
  width: 25px;
  height: 25px;
  opacity: 50%;
  margin-right: -10px;
`;

function TopTab() {
  return (
    <>
      <Tab>
        <Logo>CultureGallery</Logo>
        <span>movie</span>
        <FAQ>?</FAQ>
      </Tab>
    </>
  );
}

export default TopTab;
