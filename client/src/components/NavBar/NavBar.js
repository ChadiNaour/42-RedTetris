import { StyledNav } from "./Navbar.Style";
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
                    <li className="profile">
                        <div className="banyola">
                            <p className="letter">{user.userName.charAt(0)}</p>
                        </div>
                        <p className="username">{user.userName}</p>
                    </li>
                </li>
            </ul>
        </StyledNav>
    );
};

export default Navbar;
