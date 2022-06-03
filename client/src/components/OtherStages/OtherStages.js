import styled from "styled-components";
import Stage from "../Tetris/Stage";
import { useSelector } from "react-redux";

const StyledOtherStages = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme?.background?.secondary};
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
        rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
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
    .stages {
        flex: 1;
        // background-color: white;
        display: grid;
        padding: 2rem;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 50px;
    }
    @media (max-width: 1300px) {
        h1 {
            width: 100%;
            text-align: center;
            font-size: 30px;
            padding: ${(props) => props.theme?.headers?.h1?.padding};
            font-family: ${(props) => props.theme?.headers?.h1?.font};
            font-weight: ${(props) => props.theme?.headers?.h1?.fontWeight};
            letter-spacing: 5px;
            color: ${(props) => props.theme?.headers?.h1?.color};
        }
    }
`;

const OtherStages = (stages) => {
    const name = useSelector((state) => state.player.userName);

    return (
        <StyledOtherStages>
            <h1>Other Stages</h1>
            <div className="stages">
                {stages.stages.map((elm, i) => {
                    return (
                        elm.username !== name && (
                            <div key={i}>
                                <h3 style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    color: "white",
                                    lineHeight: "1.5",
                                    letterSpacing: "2px",
                                    fontFamily: "'Saira', sans-serif",
                                }}>{elm.username}</h3>
                                <Stage stage={elm.stage} />
                            </div>
                        )
                    );
                })}
            </div>
        </StyledOtherStages >
    );
};
export default OtherStages;
