import { useEffect } from "react";
import styled from "styled-components";
import Stage from "../Tetris/Stage";
import NextCell from "./NextCell";

const StyledInfo = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    background-color: ${(props) => props.theme?.background?.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NextTetromino = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    height: 100%;
    h1 {
        width: 100%;
        text-align: center;
        font-size: ${(props) => props.theme?.headers?.h1?.fontSize};
        padding: ${(props) => props.theme?.headers?.h1?.padding};
        font-family: ${(props) => props.theme?.headers?.h1?.font};
        font-weight: ${(props) => props.theme?.headers?.h1?.fontWeight};
        letter-spacing: ${(props) => props.theme?.headers?.h1?.letterSpacing};
        color: ${(props) => props.theme?.headers?.h1?.color};
    }
    .content {
        flex: 1;
        position: relative;
        .background {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: black;
            border-top: 1px solid #b33030;
            border-right: 1px solid #b33030;
            border-bottom: 1px solid #b33030;
        }
    }
`;

const GameDetails = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    h1 {
        width: 100%;
        text-align: center;
        font-size: ${(props) => props.theme?.headers?.h1?.fontSize};
        padding: ${(props) => props.theme?.headers?.h1?.padding};
        font-family: ${(props) => props.theme?.headers?.h1?.font};
        font-weight: ${(props) => props.theme?.headers?.h1?.fontWeight};
        letter-spacing: ${(props) => props.theme?.headers?.h1?.letterSpacing};
        color: ${(props) => props.theme?.headers?.h1?.color};
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
        font-weight: ${(props) => props.theme?.message?.fontWeight};
        letter-spacing: ${(props) => props.theme?.message?.letterSpacing};
        color: ${(props) => props.theme?.message?.color};
        padding: 0.5rem;
    }
    @media (max-width: 1300px) {
        p {
        width: 100%;
        text-align: center;
        font-size: 75%;
        font-family: Pixel, Arial, Helvetica, sans-serif;
        font-weight: ${(props) => props.theme?.message?.fontWeight};
        letter-spacing: ${(props) => props.theme?.message?.letterSpacing};
        color: ${(props) => props.theme?.message?.color};
        padding: 0.5rem;
        }
    }
`;

export const StyledNext = styled.div`
    // background-color: white;
    display: grid;
    grid-template-columns: repeat(${(props) => props.width}, 48px);
    grid-template-rows: repeat(
        ${(props) => props.height},
        calc(200px / ${(props) => props.width})
    );
    height: 180px;
    width: 180px;
    @media (max-width: 1300px) {
        grid-template-columns: repeat(${(props) => props.width}, 35px);
        grid-template-rows: repeat(
            ${(props) => props.height},
            calc(150px / ${(props) => props.width})
        );
        height: 135px;
        width: 135px;
    }
`;

const Info = ({ score, level, rows, nextStage }) => {
    return (
        <StyledInfo>
            <GameDetails>
                <div className="content">
                    <p>rows : {rows}</p>
                    <p>level : {level}</p>
                    <p>score : {score}</p>
                </div>
            </GameDetails>
            <NextTetromino>
                <div className="content">
                    <div className="background">
                        <StyledNext
                            width={nextStage[0].length}
                            height={nextStage.length}
                        >
                            {nextStage.map((row) =>
                                row.map((cell, x) => (
                                    <NextCell key={x} type={cell[0]} />
                                ))
                            )}
                        </StyledNext>
                    </div>
                </div>
            </NextTetromino>
        </StyledInfo>
    );
};

export default Info;
