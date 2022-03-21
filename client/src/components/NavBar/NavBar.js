import { StyledNav } from "./Navbar.Style";
import parse from "html-react-parser";

const Navbar = ({user, avatar}) => {
    return (
        <StyledNav>
            <ul className="list">
                <li className="list--element">
                    <p className="list--element--title">
                        red
                        <span className="list--element--title--span">
                            tetris
                        </span>
                    </p>
                </li>
                <li className="list--element">
                    <li className="profile">
                        <div className="banyola">
                        {avatar ? parse(avatar) : ""}
                        </div>
                        <p className="username">{user.userName}</p>
                    </li>
                </li>
            </ul>
        </StyledNav>
    );
};

export default Navbar;
