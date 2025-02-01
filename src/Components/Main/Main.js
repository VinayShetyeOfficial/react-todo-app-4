import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
import "./Main.css";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import todos from "../data/todos.js"; // Import demo todos

/**
 * Main component serves as the primary interface for the Todo application.
 *
 * Imports:
 * - React: Core library for building UI components.
 * - useState: React hook for managing component state.
 * - Box, TextField, Button: MUI components for UI elements.
 * - BsThreeDots, MdModeEditOutline, MdDelete: Icons for UI actions.
 * - todos: Default todo items for initialization.
 *
 * Functions:
 * - getLocalTodos: Retrieves todos from local storage.
 * - initializeLocalStorage: Initializes local storage with default todos if empty.
 * - CustomModal: Displays a modal for confirming deletion of all todos.
 * - Main: Main component function that handles todo operations.
 *
 * State:
 * - inputVal: string - Current value of the todo input field.
 * - todos: array - List of todo items.
 * - editItem: object - Tracks the item being edited.
 * - showModal: boolean - Controls the visibility of the delete confirmation modal.
 * - activeNoteIndex: number - Index of the currently active note for action buttons.
 *
 * Handlers:
 * - handleClose: Closes the delete confirmation modal.
 * - handleOpen: Opens the delete confirmation modal if there are todos.
 * - inputEvent: Updates inputVal state on input change.
 * - addTodo: Adds a new todo or updates an existing one.
 * - editTodo: Prepares a todo item for editing.
 * - deleteTodo: Removes a todo item by id.
 * - resetInput: Resets the input field.
 * - handleConfirm: Clears all todos and resets states.
 * - toggleActions: Toggles action buttons for a todo item.
 * - handleMouseEnter: Closes action buttons when hovering over another note.
 */

// Retrieve Todos from local storage
const getLocalTodos = () => {
  let todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

// Initialize local storage with demo todos if empty
const initializeLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  if (!storedTodos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

// Custom Modal to confirm deletion of all Todos
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

// Main function - application starts from here
function Main() {
  // Call initialization before useState
  initializeLocalStorage();

  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState(getLocalTodos);
  const [editItem, setEditItem] = useState({ id: null, isEditToggled: false });
  const [showModal, setShowModal] = useState(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState(null); // Track active action buttons

  const handleClose = () => setShowModal(false);
  const handleOpen = () => {
    if (todos.length) setShowModal(true);
  };

  const inputEvent = (event) => {
    setInputVal(event.target.value);
  };

  const addTodo = () => {
    if (inputVal && !editItem.isEditToggled) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo: inputVal.trim(),
          checked: false,
        },
      ]);
      setInputVal("");
    } else if (inputVal) {
      setTodos(
        todos.map((todoItem) =>
          todoItem.id === editItem.id
            ? { ...todoItem, todo: inputVal.trim() }
            : todoItem
        )
      );
      setInputVal("");
      setEditItem({ id: null, isEditToggled: false });
    }
  };

  const editTodo = (todo_id, todo_desc) => {
    setInputVal(todo_desc);
    setEditItem({ id: todo_id, isEditToggled: true });
    // Keep actions open after clicking edit
  };

  const deleteTodo = (todo_id) => {
    setTodos(todos.filter((todoItem) => todoItem.id !== todo_id));
    setActiveNoteIndex(null); // Close actions
  };

  const resetInput = () => {
    setInputVal("");
  };

  const handleConfirm = () => {
    setTodos([]);
    handleClose();
    setInputVal("");
    setEditItem({ id: null, isEditToggled: false });
    setActiveNoteIndex(null); // Close actions
  };

  // Toggle action buttons for the selected todo item
  const toggleActions = (index, event) => {
    event.stopPropagation();
    setActiveNoteIndex((prev) => (prev === index ? null : index)); // Close if clicked again
  };

  // Close actions if user hovers over another note
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
            className="input_Main"
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
            onClick={handleOpen}
          >
            Delete All
          </Button>
        </div>
        <CustomModal
          showModal={showModal}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        />
      </div>
      <div className="notes_container_Main">
        {todos.map((todoItem, indx) => (
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
                    // Do not close actions after clicking edit
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
