import { createSlice } from "@reduxjs/toolkit";
import { TodoModel } from "../models/todo";
import { UserModel } from "../models/user";

export interface InitialStateType {
  user: UserModel;
  addModal: {
    show: boolean;
    nestedTodo?: number;
  };
  todos: TodoModel[];
  filter: string;
}

const userJson = localStorage.getItem("user");

const initialState: InitialStateType = {
  user: userJson ? JSON.parse(userJson) : null,
  addModal: {
    show: false,
  },
  todos: [],
  filter: "all",
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setAddModal: (state, action) => {
      state.addModal.show = action.payload.show;
      state.addModal.nestedTodo = action.payload?.nestedTodo;
    },

    setTodos: (state, action) => {
      state.todos = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setUser, setAddModal, setTodos, setFilter } = slice.actions;

export default slice.reducer;
