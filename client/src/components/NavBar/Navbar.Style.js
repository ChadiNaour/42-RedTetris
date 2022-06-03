import styled from "styled-components";

export const StyledNav = styled.nav`
    width: 100%;
    padding-top: 4rem;
    padding-inline: 60px;
    padding-bottom: 6rem;
    height: 120px;
    display: flex;
    align-items: center;
    .list {
        width: 90%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        &--element {
            display: flex;
            height: 100%;
            align-items: center;
            font-size: 2rem;
            font-family: ${(props) => props.theme.headers?.h1?.font};
            &--title {
                color: whitesmoke;
                font-size: 70px;
                font-family: ${(props) => props.theme.headers?.h1?.font};
                &--span {
                    margin-left: 10px;
                    color: #f9253c;
                    @media (max-width: 450px) {
                        margin-left: 5px;
                    }
                }
                @media (max-width: 450px) {
                    font-size: 50px;
                }
                @media (max-width: 375px) {
                    font-size: 45px;
                }
            }
            @media (max-width: 450px) {
                font-size: 1rem;
            }
            .profile {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                height: 60px;
                border-radius: 50px;
                .banyola {
                    position: relative;
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background-color: #212121;
                    border: solid #f9253c 3px;
                    justify-content: center;
                    align-items: center;
                    @media (max-width: 450px) {
                        width: 48px;
                        height: 48px;
                    }
                }
                .username {
                    color: whitesmoke;
                    font-size: 2.6rem;
                    @media (max-width: 450px) {
                        font-size: 2.2rem;
                    }
                }
                @media (max-width: 450px) {
                    gap: 5px;
                }
            }
        }
    }
    @media (max-width: 450px) {
        margin: 0;
        padding: 0;
    }
`;
