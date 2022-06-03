import renderer from "react-test-renderer";
import GameOver from "./GameOver";

describe("GameOver", () => {
    test("game not over", () => {
        const tree = renderer
            .create(
                <GameOver
                    gameOver={false}
                    start={true}
                    UserPlayer={{ admin: true }}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("game not overr", () => {
        const tree = renderer
            .create(
                <GameOver
                    gameOver={false}
                    start={true}
                    UserPlayer={{ admin: false }}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("game start", () => {
        const tree = renderer
            .create(
                <GameOver
                    gameOver={false}
                    start={false}
                    UserPlayer={{ admin: true }}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("game over", () => {
        const tree = renderer
            .create(
                <GameOver
                    gameOver={true}
                    start={false}
                    UserPlayer={{ admin: true }}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
