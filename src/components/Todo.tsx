import { TodoModel } from "../models/todo";
import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import OutsideClickDetector from "../utill/OutsideCLickDetector";
import { publicRequest } from "../requestMethodes";
import { useSelector } from "react-redux";
import { InitialStateType } from "../redux/slice";

interface PropsType {
  todo: TodoModel;
}

const Todo = ({ todo }: PropsType) => {
  const [nestedTodos, setNestedTodos] = useState<TodoModel[]>([]);
  const [showNested, setShowNested] = useState(false);

  const containNested = nestedTodos?.length > 0;

  const { todos } = useSelector((state: InitialStateType) => state);

  const getNestedTodos = async () => {
    try {
      const res = await publicRequest.get(`/nestedTodos?todoId=${todo.id}`);
      setNestedTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNestedTodos();
  }, [todo, todos]);

  return (
    <>
      <OutsideClickDetector
        className="col-md-6 col-xl-4 d-flex flex-column align-items-end"
        onClickOutside={() => setShowNested && setShowNested(false)}
      >
        <TodoCard
          todo={todo}
          containNested={containNested}
          setShowNested={setShowNested}
          nestedTodos={nestedTodos}
        />

        {showNested &&
          nestedTodos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              containNested={false}
              setShowNested={setShowNested}
              setNestedTodos={setNestedTodos}
              nestedTodos={nestedTodos}
              isNested={true}
            />
          ))}
      </OutsideClickDetector>
    </>
  );
};

export default Todo;
