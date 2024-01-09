import { GET_USERS, IS_ACTIVE_READY, CREATE_POST } from "../types";
import { useReducer } from "react";
import { MyReducer } from "./my-reducer";
import { MyContext } from "./my-context";

const defaultState = {
    userId: null,
    token: null,
    todos: [],
    isReady: null,
};

export const MyState = ({ children }) => {
    const [state, dispatch] = useReducer(MyReducer, defaultState);

    const login = (token, id) => {
        dispatch({ type: GET_USERS, payload: { id, token } })
        localStorage.setItem("userData", JSON.stringify({ token, id }));
    };
    const IsActive = (param) => {
        dispatch({ type: IS_ACTIVE_READY, payload: param })
    }
    const createPost = (data) => {
        dispatch({ type: CREATE_POST, payload: data })
    }

    return (
        <MyContext.Provider value={{
            userId: state.userId,
            token: state.token,
            todos: state.todos,
            isReady: state.isReady,
            login,
            IsActive,
            createPost
        }} >
            {children}
        </MyContext.Provider>
    )
}