import renderer from "react-test-renderer";
import Avatar from "./UserAvatar";
test("Stage render test GameOver ", () => {
    const tree = renderer.create(<Avatar avatar={"Agoumi.png"} />).toJSON();
    expect(tree).toMatchSnapshot();
});
