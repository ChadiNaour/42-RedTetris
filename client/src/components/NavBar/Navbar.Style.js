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
                display: flex;
                align-items: center;
                gap: 15px;
                height: 70px;
                padding: 0 1.2rem 0 0.5rem;
                border-radius: 50px;
                .banyola {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: #0a3d62;
                    border: solid #f9253c 3px;
                    .letter {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 2rem;
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