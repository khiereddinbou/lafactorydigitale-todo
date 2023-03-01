import { MdDelete } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { FiCornerDownRight } from "react-icons/fi";
import { BiChevronsRight } from "react-icons/bi";
import { TodoModel } from "../models/todo";
import { useState } from "react";
import {
  InitialStateType,
  setAddModal,
  setFilter,
  setTodos,
} from "../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethodes";

interface PropsType {
  todo: TodoModel;
  containNested?: boolean;
  isNested?: boolean;
  setShowNested?: (show: any) => any;
  setNestedTodos?: (nestedTodo: TodoModel[]) => void;
  nestedTodos: TodoModel[];
}

const TodoCard = ({
  todo,
  containNested,
  setShowNested,
  isNested,
  setNestedTodos,
  nestedTodos,
}: PropsType) => {
  const [checked, setChecked] = useState(todo.completed);

  const dispatch = useDispatch();
  const { todos } = useSelector((state: InitialStateType) => state);

  const handleCheck = async () => {
    setChecked(!checked);
    try {
      await publicRequest.patch(
        `/${isNested ? "nestedTodos" : "todos"}/${todo.id}`,
        {
          completed: !checked,
        }
      );
      dispatch(
        setTodos(
          todos.map(t => (t.id === todo.id ? { ...t, completed: !checked } : t))
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async () => {
    try {
      await publicRequest.delete(
        `/${isNested ? "nestedTodos" : "todos"}/${todo.id}`
      );

      if (isNested) {
        setNestedTodos?.(nestedTodos.filter(t => t.id !== todo.id));
      } else {
        dispatch(setTodos(todos.filter(t => t.id !== todo.id)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        opacity: checked ? "0.5" : "1",
        width: isNested ? "93%" : "100%",
      }}
      className="card bg-dark bg-opacity-50 mb-3 todoCard"
    >
      <div className="card-body overflow-hidden pe-0 pt-0">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <h5 className="card-title pt-3 text-light text-wrap">
              {todo.title}
            </h5>
            <p className="card-text text-light pt-1 text-wrap">
              {todo?.description}
            </p>
          </div>

          <div className="d-flex flex-column  gap-2 px-1">
            <input
              checked={checked}
              onChange={handleCheck}
              type="checkbox"
              className="form-check-input mt-3 fs-3 pointer"
            />
            <button
              onClick={deleteTodo}
              className="btn btn-secondary  fs-4 cardBtn m-0 p-0 text-light"
            >
              <MdDelete />
            </button>{" "}
            {!isNested && (
              <button
                disabled={checked}
                className="btn fs-5 p-0 m-0 text-light cardBtn"
                onClick={() =>
                  dispatch(setAddModal({ show: true, nestedTodo: todo.id }))
                }
              >
                <BsPlusLg />
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          containNested ? "bg-dark" : ""
        } py-1 card-footer d-flex justify-content-between align-items-center`}
      >
        {isNested && <FiCornerDownRight className="text-light" size={25} />}
        <p className="text-light mb-0">{todo?.endDate}</p>
        {containNested && setShowNested && (
          <button
            onClick={() => setShowNested((prev: boolean) => !prev)}
            className="btn  p-0 m-0 text-light "
          >
            <BiChevronsRight size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
