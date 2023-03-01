import { publicRequest } from "../requestMethodes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { InitialStateType, setAddModal, setTodos } from "../redux/slice";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OutsideClickDetector from "../utill/OutsideCLickDetector";
import { formatDate } from "../utill/formatDate";

const AddTodoModal = () => {
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dispatch = useDispatch();
  const { user, addModal, todos } = useSelector(
    (state: InitialStateType) => state
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleClose = () => {
    dispatch(setAddModal({ show: false, nestedTodo: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (addModal.nestedTodo) {
        await publicRequest.post("/nestedTodos", {
          ...formInput,
          todoId: addModal.nestedTodo,
          endDate: formatDate(endDate),
          completed: false,
        });
        dispatch(setTodos([...todos]));
      } else {
        const res = await publicRequest.post("/todos", {
          ...formInput,
          userId: user.id,
          endDate: formatDate(endDate),
          completed: false,
          pos: todos.length + 1,
        });
        dispatch(setTodos([{ ...res.data }, ...todos]));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <div className="modal mt-0 bg-black bg-opacity-75 d-block">
      <OutsideClickDetector
        onClickOutside={handleClose}
        className="modal-dialog"
      >
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <span className="modal-title text-light fs-5">
              Add {addModal.nestedTodo ? "Nested" : ""} Todo
            </span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id="addNoteform">
              <div className="mb-3">
                <label
                  htmlFor="validationCustom02 "
                  className="form-label text-light"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom02"
                  value={formInput.title}
                  name="title"
                  onChange={handleChange}
                  required
                  placeholder="Todo Title"
                  maxLength={70}
                />
                <span className="text-white ps-1">
                  {formInput.title.length}/70
                </span>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="validationTextarea"
                  className="form-label text-light"
                >
                  Description (Optional)
                </label>
                <textarea
                  className="form-control"
                  id="validationTextarea"
                  placeholder="Todo Description"
                  value={formInput.description}
                  name="description"
                  onChange={handleChange}
                  rows={2}
                  maxLength={130}
                />
                <span className="text-white ps-1">
                  {formInput.description.length}/130
                </span>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="validationTextarea"
                  className="form-label text-light"
                >
                  End Date (Optional)
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button
              disabled={loading}
              type="submit"
              form="addNoteform"
              className="btn btn-primary"
            >
              {!loading ? (
                "Save"
              ) : (
                <div className="spinner-border text-light"></div>
              )}
            </button>
          </div>
        </div>
      </OutsideClickDetector>
    </div>
  );
};

export default AddTodoModal;
