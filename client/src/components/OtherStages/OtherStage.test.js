import { createStage } from "../../utils/gameHelpers";
import configureStore from "redux-mock-store";
import OtherStages from "./OtherStages";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { screen } from "@testing-library/react";

describe("other stages", () => {
    test("other stages", () => {
        let store;
        let stage = createStage();
        const mockStore = configureStore();
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: "farwila",
                roomName: null,
                avatar: null,
                error: null,
                roomError: null,
                loading: false,
                chat: [],
            },
        });
        const tree = renderer
            .create(
                <Provider store={store}>
                    <OtherStages
                        stages={[{ uername: "farwila", stage: stage }]}
                    />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
