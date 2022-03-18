import styled from "styled-components";

export const StyledNav = styled.nav`
    width: 100%;
    padding: 50px;
    height: 150px;
    display: flex;
    align-items: center;
    margin: 0 auto;
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
            font-size: 1.2rem;
            &--title {
                color: #fad390;
                font-size: 50px;
                &--span {
                    margin-left: 10px;
                    color: #f9253c;
                }
            }
            .profile {
                // background-color: red;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                height: 60px;
                padding: 0 1.5rem 0 0.2rem;
                border-radius: 50px;
                .banyola {
                    position: relative;
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background-color: #0a3d62;
                    border: solid #f9253c 3px;
                    justify-content: center;
                    align-items: center;
                    .letter {
                        position: absolute;
                        top: 38%;
                        left: 48%;
                        transform: translate(-50%, -50%);
                        font-size: 3rem;
                        color: #f9253c;
                    }
                }
                .username {
                    color: #fad390;
                    font-size: 1.8rem;
                }
                &:hover {
                    background-color: #072a43;
                }
            }
        }
    }
`;