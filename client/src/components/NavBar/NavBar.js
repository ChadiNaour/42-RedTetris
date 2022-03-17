import { StyledNav } from "./Navbar.Style";
const Navbar = () => {
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
                            <p className="letter">f</p>
                        </div>
                        <p className="username">farwila</p>
                    </li>
                </li>
            </ul>
        </StyledNav>
    );
};

export default Navbar;
