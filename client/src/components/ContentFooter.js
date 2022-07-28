import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  clearComplated,
  selectTodos,
  selectAktiveFilter,
} from "../redux/todos/todosSlice";

function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector(selectAktiveFilter);
  const itemsLeft = items.filter((item) => !item.completed).length;

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  return (
    <div>
      <footer className="footer">
        <span className="todo-count">
          <strong>{itemsLeft} </strong>
          item{itemsLeft > 1 && "s"} left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={activeFilter === "all" ? "selected" : ""}
              onClick={() => {
                dispatch(changeActiveFilter("all"));
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={activeFilter === "active" ? "selected" : ""}
              onClick={() => {
                dispatch(changeActiveFilter("active"));
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={activeFilter === "completed" ? "selected" : ""}
              onClick={() => {
                dispatch(changeActiveFilter("completed"));
              }}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          className="clear-completed"
          onClick={() => dispatch(clearComplated())}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default ContentFooter;
