import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TodoModel } from "../models/todo";
import { InitialStateType, setAddModal, setFilter } from "../redux/slice";
import AddTodoModal from "./AddTodoModal";

const TopBar = () => {
  const { filter, addModal } = useSelector((state: InitialStateType) => state);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="card bg-primary bg-opacity-10  border-bottom border-primary py-2 px-3 my-4 d-flex flex-row justify-content-between align-items-center align-self-stretch">
      <select
        value={filter}
        onChange={handleChange}
        className="form-select border-primary border-2"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={() => dispatch(setAddModal({ show: true }))}
        className="btn btn-primary d-flex align-items-center gap-2"
      >
        <FaPlus />
        Add Todo
      </button>
      {addModal.show && <AddTodoModal />}
    </div>
  );
};

export default TopBar;
