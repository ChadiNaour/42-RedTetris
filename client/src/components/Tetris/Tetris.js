import styled from "styled-components";
import Stage from "./Stage";
import GameOver from "../GameOver";
import { useRef , useEffect} from "react";

const Styled = styled.button`
    position: relative;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
    &:focus {
        outline: none;
        border: none;
    }
`;

const Tetris = ({
    move,
    keyUp,
    stage,
    gameOver,
    start,
    setStart,
    UserPlayer,
    gameFinished
}) => {
    const dd = useRef()
    useEffect(() => {
        dd.current.focus()
    }, [])
    return (
        <Styled onKeyDown={(e) => move(e)} onKeyUp={keyUp} ref={dd}>
            {start ? (
                <GameOver
                    UserPlayer={UserPlayer}
                    gameOver={gameOver}
                    start={start}
                    setStart={setStart}
                    gameFinished={gameFinished}
                />
            ) : (
                ""
            )}
            <Stage stage={stage} />
        </Styled>
    );
};
export default Tetris;
