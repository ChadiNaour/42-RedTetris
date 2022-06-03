import NextCell from "./NextCell";
import renderer from "react-test-renderer";

test("Stage render test GameOver ", () => {
    const tree = renderer.create(<NextCell type={"J"} />).toJSON();
    expect(tree).toMatchSnapshot();
});
