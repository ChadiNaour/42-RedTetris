import UserCard from "./UserCard";
import renderer from "react-test-renderer";
test("Stage render test GameOver ", () => {
    const tree = renderer
        .create(
            <UserCard player={{ avatar: "Agoumi.png", username: "pikala" }} />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
