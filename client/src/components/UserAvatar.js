import styled from "styled-components";

const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.background.primary};
  border: 2px solid ${(props) => props.theme.border.avatar};
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: ${(props) => props.theme.headers.h3.fontSize};
    font-size: 0.8rem;
    font-family: ${(props) => props.theme.headers.h3.font};
    font-weight: ${(props) => props.theme.headers.h3.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h3.letterSpacing};
    color: ${(props) => props.theme.headers.h3.color};
  }
`;

const Avatar = () => {
  return (
    <StyledAvatar>
      <h3>us</h3>
    </StyledAvatar>
  );
};

export default Avatar;
