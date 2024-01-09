import { GET_USERS, IS_ACTIVE_READY, CREATE_POST } from "../types";


export const MyReducer = (state, action) => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.id,
            }
        }

        case IS_ACTIVE_READY: {
            return {
                ...state,
                isReady: action.payload
            }
        }

        case CREATE_POST: {
            return {
                ...state,
                todos: action.payload
            }
        }

        default:
            return state;
    }
}