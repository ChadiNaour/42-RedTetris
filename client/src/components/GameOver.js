import React from "react";
import url from "../images/GameOver.png";
import url1 from "../images/WinCup.gif";
import styled from "styled-components";

export const StyledOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #333333;
    z-index: 2;
    outline: 4px solid #333333;
    opacity: 0.9;
`;

export const StyledOverlayText = styled.div`
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    display: flex;
    font-family: "Saira", sans-serif;
    flex-direction: column;
    padding: 1px;
    font-size: 25px;
    align-items: center;
    color: white;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    h1 {
        color: white;
        font-family: "Saira", sans-serif;
        font-size: xx-large;
        text-shadow: none;
        text-align: center;
        font-weight: bolder;
        padding: 50px 0px 50px;
        letter-spacing: 3px;
    }
    p {
    }
    @media screen and (max-width: 768px) {
        h1 {
            color: white;
            font-family: "Saira", sans-serif;
            font-size: xx-large;
            text-shadow: none;
            text-align: center;
            font-weight: bolder;
            padding: 50px 0px 50px;
            letter-spacing: 3px;
        }
    }
    @media screen and (max-width: 480px) {
        h1 {
            color: white;
            font-family: "Saira", sans-serif;
            font-size: xx-large;
            text-shadow: none;
            text-align: center;
            font-weight: bolder;
            padding: 50px 0px 50px;
            letter-spacing: 3px;
            font-size: large;
        }
    }
`;

export default function GameOver({ gameOver, start, UserPlayer, gameFinished }) {
    return (
        <StyledOverlay>
            <StyledOverlayText>
                {gameOver ? (
                    <img
                        data-testid="gameOver-Lost-img"
                        style={{ width: "200px" }}
                        src={url}
                    />
                ) : (gameFinished ? <img
                    data-testid="gameOver-Lost-img"
                    style={{ width: "200px" }}
                    src={url1}
                /> : ""
                )}

                {gameOver ? (
                    <div>
                        <h1>{"You lost"}</h1>
                        <p>
                            {UserPlayer.admin ? 
                                "Press Enter to restart the game" : "Wait for host player to restart the game"
                            }
                        </p>
                    </div>
                ) : (gameFinished ? <div>
                    <h1>{"Congrats! You are the Winner"}</h1>
                    <p>
                    {UserPlayer.admin ? 
                                "Press Enter to restart the game" : "Wait for host player to restart the game"
                            }
                    </p>
                </div> : ""

                )}
                {/* {!start ? */}
                {start && (!gameOver && !gameFinished) ? (
                    <div className="overlay-content">
                        <div className="my-4 flex flex-row justify-between">
                            <kbd
                                style={{
                                    fontSize: "1rem",
                                    height: "2rem",
                                    borderRadius: "5px",
                                    border: "2px solid white",
                                    paddingInline: "5px",
                                }}
                            >
                                up
                            </kbd>
                            <span>piece&nbsp; rotation</span>
                        </div>
                        <div className="my-4 flex flex-row justify-between">
                            <kbd
                                style={{
                                    fontSize: "1rem",
                                    height: "2rem",
                                    borderRadius: "5px",
                                    border: "2px solid white",
                                    paddingInline: "5px",
                                }}
                            >
                                down
                            </kbd>
                            <span>move&nbsp; piece&nbsp; down</span>
                        </div>
                        <div className="my-4 flex flex-row justify-between">
                            <kbd
                                style={{
                                    fontSize: "1rem",
                                    height: "2rem",
                                    borderRadius: "5px",
                                    border: "2px solid white",
                                    paddingInline: "5px",
                                }}
                            >
                                left
                            </kbd>
                            <span>move &nbsp;piece &nbsp;left</span>
                        </div>
                        <div className="my-4 flex flex-row justify-between">
                            <kbd
                                style={{
                                    fontSize: "1rem",
                                    height: "2rem",
                                    borderRadius: "5px",
                                    border: "2px solid white",
                                    paddingInline: "5px",
                                }}
                            >
                                right
                            </kbd>
                            <span>move &nbsp;piece&nbsp; right</span>
                        </div>
                        <div className="my-4 flex flex-row justify-between">
                            <kbd
                                style={{
                                    fontSize: "1rem",
                                    height: "2rem",
                                    borderRadius: "5px",
                                    border: "2px solid white",
                                    paddingInline: "5px",
                                }}
                            >
                                space
                            </kbd>
                            <span>hard &nbsp;drop</span>
                        </div>
                        {UserPlayer.admin ? (
                            <h1>Press &nbsp;enter &nbsp;to &nbsp;start</h1>
                        ) : (
                            <h1>
                                Wait &nbsp;for &nbsp;admin &nbsp;to &nbsp;Start
                            </h1>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </StyledOverlayText>
        </StyledOverlay>
    );
}
