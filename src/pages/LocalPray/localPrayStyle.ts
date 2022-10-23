import styled from "styled-components";

const PrayChain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  background-color: #61dafb;
`;

const PrayQuestionBoxContainer = styled.div<{
  themeColor?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  border: 2px solid
    ${(props) => (props.themeColor ? props.themeColor : "green")};
  border-radius: 8px;
  padding: 16px;

  width: 240px;

  transform: translateX(-50%);
  position: absolute;
  top: 0;

  margin-top: 15px;
  margin-left: 10px;

  color: ${(props) => (props.themeColor ? props.themeColor : "green")};
  font-weight: bold;
  font-size: 14px;

  background-color: white;

  button {
    width: fit-content;
    background-color: ${(props) => (props.themeColor ? "#9eabe5" : "#d3f1df")};
    border: none;
    border-radius: 4px;
    padding: 4px 16px;
    cursor: pointer;

    z-index: 15;
  }
`;

export { PrayChain, PrayQuestionBoxContainer };
