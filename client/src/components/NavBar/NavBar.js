import { useDispatch, useSelector } from "react-redux";
import { leaveRoomRequest } from "../../store/slices/playerSlice";
import { StyledNav } from "./NavBar.style";

const Navbar = ({ user }) => {
    const dispatch = useDispatch();
    const { userName, roomName, admin } = useSelector((state) => state.player);
    const leaveRoom = () => {
        if (roomName) dispatch(leaveRoomRequest({ userName, roomName, admin }));
    };
    return (
        <StyledNav>
            <ul className="list">
                <li className="list--element">
                    <p
                        role="leave"
                        onClick={leaveRoom}
                        className="list--element--title"
                    >
                        red
                        <span className="list--element--title--span">
                            tetris
                        </span>
                    </p>
                </li>
                <li className="list--element">
                    <div className="profile">
                        <div className="banyola">
                            <img
                                src={require("../../images/Avatars/" +
                                    user.avatar)}
                                alt="Avatar"
                                className="object-cover object-center w-full h-full"
                            />
                        </div>
                        <p className="username">{user.userName}</p>
                    </div>
                </li>
            </ul>
        </StyledNav>
    );
};

export default Navbar;
