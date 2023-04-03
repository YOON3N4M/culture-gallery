import styled from "styled-components";

const Tab = styled.div`
  width: 100vw;
  height: 50px;
  background-color: #181823;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
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

function TopTab() {
  return (
    <>
      <Tab>
        <Logo>PhotoGallery</Logo>
        <FAQ>?</FAQ>
      </Tab>
    </>
  );
}

export default TopTab;
