// actions.js
import axios from "axios";

// These are our action types
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";
export const UPDATE_ROOMS = "UPDATE_ROOMS";

// Now we define actions
export function createRoomRequest() {
        return {
                type: CREATE_ROOM_REQUEST,
                payload: { loading: true },
        };
}

export function createRoomSuccess(payload) {
        return {
                type: CREATE_ROOM_SUCCESS,
                payload,
        };
}

export function createRoomError(error) {
        return {
                type: CREATE_ROOM_ERROR,
                error,
        };
}

export function createRoom(roomName) {
        return async function (dispatch) {
                dispatch(createRoomRequest());
                try {
                        const response = await axios.get(
                                `http://localhost:3001/room?name=${roomName}`
                        );
                        dispatch(
                                createRoomSuccess({
                                        loading: false,
                                        data: response.data,
                                })
                        );
                } catch (error) {
                        dispatch(
                                createRoomError({
                                        loading: false,
                                        error: error,
                                })
                        );
                }
        };
}