/**
 * Main Todo application component.
 * Handles todo list management including:
 * - Adding new todos
 * - Editing existing todos
 * - Deleting todos
 * - Displaying initial demo todos for first-time users
 *
 * Uses localStorage for data persistence
 */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
import "./Main.css";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import todos from "../data/todos.js";

/**
 * Custom modal component for confirming todo deletion
 *
 * Props:
 * - showModal: boolean - Controls modal visibility
 * - handleClose: function - Closes the modal
 * - handleConfirm: function - Handles deletion confirmation
 */
function CustomModal({ showModal, handleClose, handleConfirm }) {
  return (
    <>
      <div
        className={`modal-overlay ${showModal ? "overlay_active" : ""}`}
      ></div>
      <div className={`modal-container ${showModal ? "modal_active" : ""}`}>
        <div className="modal-content">
          <p className="confirm_msg">
            Are you sure you want to delete all Todos?
          </p>
          <div className="modal-buttons">
            <Button
              variant="contained"
              className="btn2 msg-btn"
              onClick={handleConfirm}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              className="btn2 msg-btn"
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Main() {
  // Initialize todos with demo data for first-time users
  const getInitialTodos = () => {
    const isFirstLaunch = !localStorage.getItem("hasLaunched");
    const storedTodos = localStorage.getItem("todos");

    if (isFirstLaunch) {
      localStorage.setItem("hasLaunched", "true");
      localStorage.setItem("todos", JSON.stringify(todos));
      return todos;
    }

    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  // State management
  const [todoList, setTodoList] = useState(getInitialTodos());
  const [inputVal, setInputVal] = useState("");
  const [editItem, setEditItem] = useState({ id: null, isEditToggled: false });
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList)); // This will save todos to localStorage whenever the state changes
  }, [todoList]);

  const inputEvent = (event) => {
    setInputVal(event.target.value);
  };

  const addTodo = () => {
    if (inputVal.trim() !== "") {
      if (!editItem.isEditToggled) {
        const newTodo = {
          id: new Date().getTime().toString(),
          todo: inputVal,
        };
        setTodoList([...todoList, newTodo]);
      } else {
        setTodoList(
          todoList.map((elem) => {
            if (elem.id === editItem.id) {
              return { ...elem, todo: inputVal };
            }
            return elem;
          })
        );
        setEditItem({ id: null, isEditToggled: false });
      }
      setInputVal("");
      setActiveNoteIndex(null);
    }
  };

  const editTodo = (todo_id, todo_text) => {
    setInputVal(todo_text);
    setEditItem({ id: todo_id, isEditToggled: true });
  };

  const deleteTodo = (todo_id) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== todo_id));
    setActiveNoteIndex(null);
  };

  const resetInput = () => {
    setInputVal("");
  };

  const handleConfirm = () => {
    setTodoList([]); // Delete all todos
    handleClose();
    setInputVal("");
    setEditItem({ id: null, isEditToggled: false });
    setActiveNoteIndex(null);
  };

  const toggleActions = (index, event) => {
    event.stopPropagation();
    setActiveNoteIndex((prev) => (prev === index ? null : index));
  };

  const handleMouseEnter = (index) => {
    if (activeNoteIndex !== index) setActiveNoteIndex(null);
  };

  return (
    <div className="main">
      <div className="container_Main">
        <h1 className="heading_Main">What's on your calendar today?</h1>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            fullWidth
            label="Enter todos"
            id="fullWidth"
            value={inputVal}
            onChange={inputEvent}
            autoComplete="off"
          />
        </Box>
        <div className="btn-container">
          <Button
            variant="contained"
            className="btn_Main btn2"
            onClick={addTodo}
          >
            {!editItem.isEditToggled ? "Add" : "Update"}
          </Button>
          <Button
            variant="outlined"
            className="btn_Main btn2"
            onClick={resetInput}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            className="btn_Main btn2"
            onClick={handleShow}
          >
            Delete All
          </Button>
        </div>
        <CustomModal
          showModal={show}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        />
      </div>
      <div className="notes_container_Main">
        {todoList.map((todoItem, indx) => (
          <div
            className="note_Main"
            key={indx}
            onMouseEnter={() => handleMouseEnter(indx)}
          >
            <div className="noteItem">
              {todoItem.todo}
              <button
                className="action-toggle-btn"
                onClick={(e) => toggleActions(indx, e)}
              >
                <BsThreeDots />
              </button>
              <div
                className={`action-container  ${
                  activeNoteIndex === indx ? "action-active" : ""
                }`}
              >
                <button
                  type="button"
                  className="action-btn edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    editTodo(todoItem.id, todoItem.todo);
                  }}
                >
                  <MdModeEditOutline />
                </button>
                <button
                  type="button"
                  className="action-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todoItem.id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
