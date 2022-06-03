import Info from "./Info";
import renderer from "react-test-renderer";

describe("test Info", () => {
    test("test next tetro", () => {
        const tree = renderer
            .create(
                <Info
                    score={0}
                    rows={0}
                    level={0}
                    nextStage={[
                        [
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                        ],
                        [
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                        ],
                        [
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                        ],
                        [
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                            [0, "clear"],
                        ],
                    ]}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
