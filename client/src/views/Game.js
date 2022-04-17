import styled from "styled-components";
// import Info from "../components/Info/Info";
import Info from "../components/Info/Info";
import Chat from "../components/Chat/Chat.js";
import OtherStages from "../components/OtherStages/OtherStages";
import Tetris from "../components/Tetris/Tetris";
import { useSelector, useDispatch } from "react-redux";

const StyledContainer = styled.div`
  /* width: 100%; */
  display: grid;
  background-color: ${(props) => props.theme.background.primary};
  grid-template-columns: 500px 500px 500px;
  grid-template-rows: 350px 350px 350px;
  // padding: 1rem;
  gap: 1rem;
  justify-content: center;
  grid-template-areas:
    "otherstage stage info"
    "otherstage stage msgs"
    "otherstage stage msgs";
  @media (max-width: 1300px) {
    /* height: 1800px !important; */
    grid-template-columns: 300px 300px 300px !important;
    grid-template-rows: 300px 300px 300px !important;
  }
  @media (max-width: 1000px) {
    /* height: 1800px !important; */
    grid-template-columns: 300px 300px !important;
    grid-template-rows: 400px 600px !important;
    grid-template-areas:
      "msgs  info"
      "otherstage  stage" !important;
  }
  @media (max-width: 600px) {
    /* height: 1800px !important; */
    grid-template-columns: 300px !important;
    grid-template-rows: 500px 500px 250px 250px !important;
    background-color: turquoise !important;
    grid-template-areas:
      "info"
      "stage"
      "otherstage"
      "msgs" !important;
  }
  @media (max-width: 380px) {
    /* height: 1800px !important; */
    /* padding: rem !important; */
    grid-template-columns: 250px !important;
    grid-template-rows: 500px 500px 250px 250px !important;
    background-color: turquoise !important;
    grid-template-areas:
      "info"
      "stage"
      "otherstage"
      "msgs" !important;
  }
`;

const StyledOtherStages = styled.div`
  grid-area: otherstage;
  background: blue;
`;
const StyledStage = styled.div`
  background: yellow;
  grid-area: stage;
  border: 1px solid ${(props) => props.theme.border.stage};
`;
const StyledInfo = styled.div`
  background: red;
  grid-area: info;
  /* padding: 1rem; */
`;
const StyledMsgs = styled.div`
  background: green;
  grid-area: msgs;
`;

const Game = () => {
  const players = useSelector((state) => state.playersReducer.players);
  const player = useSelector((state) => state.playerReducer);
  //console.log("hado homa lplayers", players);

  return (
    <StyledContainer>
      {/* <StyledOtherStages>
        <OtherStages />
      </StyledOtherStages> */}
      <StyledStage>
        <Tetris />
      </StyledStage>
      {/* <StyledInfo>
        <Info />
      </StyledInfo> */}
      <StyledMsgs>
        <Chat players={players} player={player} />
      </StyledMsgs>
    </StyledContainer>
  );
};

export default Game;
