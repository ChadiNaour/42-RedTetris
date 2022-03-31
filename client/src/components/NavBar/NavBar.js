import { StyledNav } from "./Navbar.Style";
import parse from "html-react-parser";

const Navbar = ({user}) => {
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
                    <div className="profile">
                        <div className="banyola">
                        <img src={require("../../images/Avatars/"+ user.avatar)} alt="Avatar" className="object-cover object-center w-full h-full" />
                        </div>
                        <p className="username">{user.userName}</p>
                    </div>
                </li>
            </ul>
        </StyledNav>
    );
};

export default Navbar;
