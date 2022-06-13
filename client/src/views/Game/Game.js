import { useEffect, useState } from "react";
import styled from "styled-components";
import Info from "../../components/Info/Info";
import Chat from "../../components/Chat/Chat.js";
import OtherStages from "../../components/OtherStages/OtherStages";
import Tetris from "../../components/Tetris/Tetris";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "../../hooks/useInterval";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useGameStatus } from "../../hooks/useGameStatus";
import { createStage, checkCollision } from "../../utils/gameHelpers";
import {
    startTheGameRequest,
    newTetrosRequest,
} from "../../store/slices/playerSlice";
import { sendStage } from "../../store/slices/playerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: 25% 23% 28%;
    grid-template-rows: 25vh 25vh 30vh ;
    gap: 1rem;
    justify-content: center;
    grid-template-areas:
        "otherstage stage info"
        "otherstage stage msgs"
        "otherstage stage msgs";
    @media (max-width: 1500px) {
        // background-color: red;
        grid-template-columns: 420px 420px 420px !important;
        grid-template-rows: 230px 270px 270px !important;
    }
    @media (max-width: 1300px) {
        // background-color: green;
        gap: 10px;
        grid-template-columns: 32% 32% 32% !important;
        grid-template-rows: 220px 220px 220px !important;
    }
    @media (max-width: 1000px) {
        grid-template-columns: 48% 48% !important;
        grid-template-rows: 400px 700px !important;
        grid-template-areas:
            "msgs  info"
            "otherstage  stage" !important;
    }
    @media (max-width: 600px) {
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
    // background: yellow;
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
    const dispatch = useDispatch();
    let tetrominos = useSelector((state) => state.player.tetros);
    const [boardDisplay, setBoardDisplay] = useState(true);
    const players = useSelector((state) => state.players.players);
    const UserPlayer = useSelector((state) => state.player);
    let wall = useSelector((state) => state.player.wall);
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [getTetrimino, setgetTetrimino] = useState(false);
    const [gameStart, setGameStart] = useState(false);

    const [
        player,
        updatePlayerPos,
        resetPlayer,
        playerRotate,
        nextPiece,
        concatTetriminos,
        setConcatTetriminos,
    ] = usePlayer(
        tetrominos,
        setBoardDisplay,
        setDropTime,
        setGameOver,
        setGameStart,
        setgetTetrimino
    );
    const [stage, setStage, rowsCleared, nextStage, setNextStage] = useStage(
        player,
        resetPlayer,
        nextPiece,
        gameOver,
        wall
    );
    const [score, setScore, rows, setRows, level, setLevel] =
        useGameStatus(rowsCleared);

    // Check if the Game finished (Battle mode)
    useEffect(() => {
        if (UserPlayer.gameEnd) {
            setBoardDisplay(true);
            setgetTetrimino(false);
            setGameOver(false);
            setGameStart(false);
            setDropTime(null);
        }
    }, [UserPlayer.gameEnd]);

    // Emit the stage
    useEffect(() => {
        dispatch(sendStage(stage));
    }, [stage]);

    //start the game
    useEffect(() => {
        if (gameStart) {
            if (tetrominos.length > 0) {
                setStage(createStage());
                setNextStage(createStage(4, 4));
                resetPlayer();
                setGameOver(false);
                setScore(0);
                setLevel(0);
                setRows(0);
                setDropTime(1000);
            }
            setBoardDisplay(false);
            setGameOver(false);
            setGameStart(false);
            setDropTime(1000 / (level + 1) + 200);
        }
    }, [gameStart]);

    // Custom hook by Dan Abramov
    useInterval(() => {
        drop();
    }, dropTime);

    //start the game
    const startgame = (e) => {
        if (e.key === "Enter") {
            if (!getTetrimino) {
                if (UserPlayer.admin) {
                    dispatch(startTheGameRequest(UserPlayer.roomName));
                } else toast("Wait for admin to start the Game");
            }
        }
    };

    // get tetros
    useEffect(() => {
        if (tetrominos.length > 0 && !UserPlayer.gameOver) {
            setGameStart(true);
            setgetTetrimino(true);
        }
        return () => { };
    }, [tetrominos]);

    // Get Tetriminos for the second time
    useEffect(() => {
        if (concatTetriminos) {
            dispatch(newTetrosRequest(UserPlayer.roomName));
            setConcatTetriminos(false);
        }
    }, [concatTetriminos]);

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            // Activate the interval again when user releases down arrow.
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    };

    const drop = () => {
        // Increase level when player has cleared 5 rows
        if (rows > (level + 1) * 5) {
            setLevel((prev) => prev + 1);
            // Also increase speed
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };

    // Hard Drop the tetrimino
    const hardDrop = () => {
        let tmp = 0;
        while (!checkCollision(player, stage, { x: 0, y: tmp })) tmp += 1;
        updatePlayerPos({ x: 0, y: tmp - 1, collided: false });
    };

    const dropPlayer = () => {
        // We don't need to run the interval when we use the arrow down to
        // move the tetromino downwards. So deactivate it for now.
        setDropTime(null);
        drop();
    };

    // This one starts the game

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            } else if (keyCode === 32) {
                hardDrop();
            }
        }
    };

    return (
        <StyledContainer onKeyPress={startgame}>
            <ToastContainer />
            <StyledOtherStages>
                <OtherStages stages={UserPlayer.stages} />
            </StyledOtherStages>
            <StyledStage>
                <Tetris
                    UserPlayer={UserPlayer}
                    move={move}
                    keyUp={keyUp}
                    stage={stage}
                    gameOver={gameOver}
                    gameFinished={UserPlayer.gameEnd}
                    start={boardDisplay}
                    setStart={setBoardDisplay}
                />
            </StyledStage>
            <StyledInfo>
                <Info
                    score={score}
                    level={level}
                    rows={rows}
                    nextStage={nextStage}
                />
            </StyledInfo>
            <StyledMsgs>
                <Chat players={players} player={UserPlayer} />
            </StyledMsgs>
        </StyledContainer>
    );
};

export default Game;
