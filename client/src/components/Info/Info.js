import styled from "styled-components";

const StyledInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.background.secondary};
  display: flex;
`;

const NextTetromino = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
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
  .content {
    flex: 1;
    /* background-color: white; */
    /* border: 1px solid ${(props) => props.theme.border.avatar};
     */
    position: relative;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      background-color: black;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(6, 1fr);
      .item {
        border: 1px solid #b33030;
      }
    }
  }
`;

const GameDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
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
  .content {
    flex: 1;
    background-color: black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #b33030;
    border-left: 1px solid #b33030;
    border-bottom: 1px solid #b33030;
  }
  p {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-weight: ${(props) => props.theme.message.fontWeight};
    letter-spacing: ${(props) => props.theme.message.letterSpacing};
    color: ${(props) => props.theme.message.color};
    padding: 0.5rem;
  }
`;

const Info = () => {
  const array = new Array(36).fill(0);
  return (
    <StyledInfo>
      <GameDetails>
        <h1>Details</h1>
        <div className="content">
          <p >score : 50</p>
          <p>level : 10</p>
          <p>mode : select</p>
        </div>
      </GameDetails>
      <NextTetromino>
        <h1>Next</h1>
        <div className="content">
          <div className="tetromino"></div>
          <div className="background">
            {array.map((_, index) => (
              <div className="item" key={index}></div>
            ))}
          </div>
        </div>
      </NextTetromino>
    </StyledInfo>
  );
};

export default Info;
