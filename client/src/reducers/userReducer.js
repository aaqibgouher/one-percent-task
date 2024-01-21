import { GET_ME, GET_STATS, GET_TODOS, SET_TODO, SET_TOKEN } from "../types";

const initialState = {
  me: null,
  token: null,
  stats: [],
  todos: [],
  priorities: [
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" },
  ],
  selectedTodo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case GET_ME:
      return {
        ...state,
        me: action.payload,
      };
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case SET_TODO:
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
