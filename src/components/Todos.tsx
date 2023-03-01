import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TodoModel } from "../models/todo";
import { InitialStateType, setTodos } from "../redux/slice";
import { publicRequest } from "../requestMethodes";
import Todo from "./Todo";

const Todos = () => {
  const [loading, setLoading] = useState(false);
  const [filtredTodos, setFiltredTodos] = useState<TodoModel[]>([]);
  const { user, todos, filter } = useSelector(
    (state: InitialStateType) => state
  );
  const dispatch = useDispatch();

  const getTodos = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get(`/todos?userId=${user.id}`);
      dispatch(setTodos(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterTodos = () => {
    if (filter === "all") {
      setFiltredTodos(todos);
    } else if (filter === "active") {
      const activeTodos = todos.filter(t => !t.completed);
      setFiltredTodos(activeTodos);
    } else {
      const completedTodos = todos.filter(t => t.completed);
      setFiltredTodos(completedTodos);
    }
  };

  useEffect(() => {
    filterTodos();
  }, [filter]);

  useEffect(() => {
    if (filter === "all") {
      setFiltredTodos(todos);
    } else {
      filterTodos();
    }
  }, [todos]);

  useLayoutEffect(() => {
    getTodos();
  }, [user]);

  return (
    <div className="row g-3 w-100">
      {loading ? (
        <div
          className="spinner-border text-secondary mx-auto mt-5"
          style={{ width: "4rem", height: "4rem" }}
        ></div>
      ) : filtredTodos?.length > 0 ? (
        filtredTodos.map(todo => <Todo key={todo.id} todo={todo} />)
      ) : (
        <span className="display-4 mt-5 fw-semibold text-secondary text-center">
          You don't have any todo yet!
        </span>
      )}
    </div>
  );
};

export default Todos;
