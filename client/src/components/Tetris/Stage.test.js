import renderer from "react-test-renderer";
import Stage from "./Stage";
import { createStage } from "../../utils/gameHelpers";

let stage = createStage(12, 20);

test("Stage render test GameOver ", () => {
    const tree = renderer.create(<Stage stage={stage} />).toJSON();
    expect(tree).toMatchSnapshot();
});
