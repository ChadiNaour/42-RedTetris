import styled from "styled-components";
export const StyledRoomCard = styled.div`
    background-color: ${(props) => props.theme?.background?.secondary};
    width: 250px;
    height: auto;
    border-radius: 15px;
    overflow: hidden;
    .name {
        display: flex;
        align-items: center;
        color: white;
        width: 100%;
        gap: 10px;
        justify-content: center;
        padding: 1.5rem;
        margin-top: 15px;
        font-size: 1rem;
        text-align: center;
        border-bottom: 1px solid white;
    }
    .players {
        font-size: 0.8rem;
        text-align: center;
        border-bottom: 1px solid white;
        color: white;
    }
    .cover {
        width: 100%;
        height: 200px;
        background-color: ${(props) => props.theme?.background?.primary};
        background-image: url("https://images.unsplash.com/photo-1634295912158-9c847b6b3a40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGV0cmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
        background-size: cover;
        background-position: center;
        background-image: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(0, 0, 0, 0.4) 100%
            ),
            url("https://images.unsplash.com/photo-1599933310642-8f07bdea325a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGV0cmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
    }
    .status {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 1rem;
        font-size: 0.8rem;
        text-align: center;
        color: white;
    }
`;
export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2%;
    justify-content: center;
    align-items: center;
    .title {
        width: 100%;
        text-align: center;
        font-size: 6em;
        font-family: ${(props) => props.theme?.headers?.h1?.font};
        font-weight: ${(props) => props.theme?.headers?.h1?.fontWeight};
        letter-spacing: ${(props) => props.theme?.headers?.h1?.letterSpacing};
        color: ${(props) => props.theme?.headers?.h1?.color};
    }
    .create {
        display: flex;
        width: 100%;
        flex-direction: column;
        .lista {
            &:hover {
                background-color: #f9253c;
            }
        }
        .container {
            margin-top: 2rem;
            flex: 1;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 50px;
        }
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .title {
            font-size: 4em;
            padding-bottom: 0.5rem;
        }
    }
    .input {
        &::placeholder {
            line-height: 50px;
        }
    }
`;

export const JoinRoom = styled.div`
    margin-top: 2rem;
    width: 100%;
    height: auto;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        font-size: 4em;
        padding-bottom: 0.5rem;
    }
    .rooms-container {
        width: 100%;
        padding: 3rem;
        display: flex;
        flex-direction: wrap;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        svg {
            width: 100%;
            height: 100%;
        }
    }
    .container {
        width: 100%;
        flex: 1;

        header,
        .room {
            width: 100%;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            align-content: center;
            border-bottom: 1px solid white;
            .item {
                font-size: 1rem;
                padding: 0.5rem;
                color: white;
                text-align: center;
                flex: 1;
            }
            .name {
                flex: 3;
            }
        }
        .room {
            border-bottom: 1px solid #b33030;
        }
    }
`;
