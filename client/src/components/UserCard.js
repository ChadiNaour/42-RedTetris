import Avatar from "./UserAvatar";
import styled from "styled-components";
import parse from "html-react-parser";

const StyledUserCard = styled.div`
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    h3 {
        font-size: ${(props) => props.theme?.headers?.h3?.fontSize};
        font-size: 0.8rem;
        font-family: ${(props) => props.theme?.headers?.h3?.font};
        font-weight: ${(props) => props.theme?.headers?.h3?.fontWeight};
        letter-spacing: ${(props) => props.theme?.headers?.h3?.letterSpacing};
        color: ${(props) => props.theme?.headers?.h3?.color};
    }
`;

const UserCard = ({ player }) => {
    return (
        <StyledUserCard>
            <Avatar avatar={player.avatar} />

            <h3>{player.username}</h3>
        </StyledUserCard>
    );
};

export default UserCard;
