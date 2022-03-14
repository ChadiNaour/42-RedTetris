import styled from "styled-components";
import Tetris from "../Tetris/Tetris";

const StyledOtherStages = styled.div`
  width: 100%;
  height: 100%;
  /* background: white; */
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.background.secondary};
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  /* border-radius: 10px; */
  h1 {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.headers.h1.fontSize};
    padding: ${(props) => props.theme.headers.h1.padding};
    font-family: ${(props) => props.theme.headers.h1.font};
    font-weight: ${(props) => props.theme.headers.h1.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h1.letterSpacing};
    color: ${(props) => props.theme.headers.h1.color};
  }
  .stages {
    flex: 1;
    display: grid;
    padding: 2rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 50px;
    /* box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px; */
    /* box-shadow: ${(props) =>
      props.theme.background.stage} 0px 0px 0px 3px; */
  }
`;

const OtherStages = () => {
  return (
    <StyledOtherStages>
      <h1>Other Stages</h1>
      <div className="stages">
        <div className="stages-item">
          {/* <h3>username</h3> */}
          <Tetris />
        </div>
        <div className="stages-item">
          {/* <h3>username</h3> */}
          <Tetris />
        </div>
        <div className="stages-item">
          {/* <h3>username</h3> */}
          <Tetris />
        </div>
        <div className="stages-item">
          {/* <h3>username</h3> */}
          <Tetris />
        </div>
      </div>
    </StyledOtherStages>
  );
};
export default OtherStages;
