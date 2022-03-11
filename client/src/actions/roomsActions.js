// actions.js
import axios from "axios";
import { updateRooms } from '../reducers/roomsSlice'

// These are our action types
// export const GET_ROOMS = "GET_ROOMS";

// Now we define actions
// export function getRooms() {
//         return {
//                 type: GET_ROOMS,
//                 // payload: { loading: true },
//         };
// }

export function getRoomsRequest() {
        return async function (dispatch) {
                try {
                        const response = await axios.get(
                                `http://localhost:3001/rooms`
                        );
                        // console.log(response);
                        dispatch(
                                updateRooms(response.data)
                        );
                } catch (error) {
                        console.log(error);
                }
        };
}