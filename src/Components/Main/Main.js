import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import './Main.css'
import { BsThreeDots } from 'react-icons/bs';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';

// Retrieve Todo's from local storage 
const getLocalTodos = () => {
    let todos = localStorage.getItem('todos')

    if (todos) {
        return JSON.parse(todos)
    }
    else {
        return []
    }
}

// Custom Modal to confirm, if user wants to **DELETE** all Todo's
function CustomModal({ showModal, handleClose, handleConfirm }) {
    return (
        <>
            <div className={`modal-overlay ${showModal && 'overlay_active'}`}></div>
            <div className={`modal-container ${showModal && 'modal_active'}`}>
                <div className="modal-content">
                    <p className="confirm_msg">Are you sure, you want to delete all Todo's?</p>
                    <div className="modal-buttons">
                        <Button variant="contained" className='btn2 msg-btn' onClick={handleConfirm}>Yes</Button>
                        <Button variant="contained" className='btn2 msg-btn' onClick={handleClose}>No</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Main function - application starts from here
function Main() {
    // State to handle input field
    const [inputVal, setInputVal] = useState("")

    // State (Object) to store all Todo's
    const [todos, setTodos] = useState(getLocalTodos)

    // State to handle Edit events
    const [editItem, setEditItem] = useState({
        id: null,
        isEditToggled: false
    })

    // State to handle Modal event for delete all Todo's prompt
    const [showModal, setShowModal] = useState(false);

    // Function to close Modal
    const handleClose = () => setShowModal(false);

    // Function to display Modal
    const handleOpen = () => {
        if (todos.length) {
            setShowModal(true);
        }
    }

    // Function to handle input event
    const inputEvent = (event) => {
        setInputVal(event.target.value)
    }

    // Function to **ADD** Todo items
    const addTodo = () => {
        // Condition to ADD todo item if edit is not toggled
        if (inputVal && !editItem.isEditToggled) {
            setTodos([...todos, {
                id: Date.now(),
                todo: inputVal.trim(),
                checked: false
            }])

            setInputVal("")
        }

        // Condition to ADD todo item if edit is toggled
        else if (inputVal) {
            setTodos(
                todos.map((todoItem) => {
                    if (todoItem.id === editItem.id) {
                        return {
                            ...todoItem,
                            todo: inputVal.trim(),
                        }
                    }
                    return todoItem
                })
            )

            setInputVal('')
            setEditItem({
                id: null,
                isEditToggled: false,
            })
        }
    }

    // Function to **EDIT** the Todo items
    const editTodo = (todo_id, todo_desc) => {
        setInputVal(todo_desc)
        setEditItem({
            id: todo_id,
            isEditToggled: true,
        })
    }

    // Function to **DELETE** the Todo items
    const deleteTodo = (todo_id) => {

        // Printing Todo Id's to the console to keeptrack of delete requests
        console.log("Request to delete Todo item with id: " + todo_id)

        setTodos(
            todos.filter((todoItem) => {
                if (todoItem.id !== todo_id) {
                    return todoItem
                }
                return todoItem
            })
        )

        if (inputVal) {
            setInputVal('')
            setEditItem({
                id: todo_id,
                isEditToggled: false,
            })
        }
    }

    // Function to **RESET** input field
    const resetInput = () => {
        setInputVal('')
    }

    // Function to ***DELETE*** all Todo's once confirmed from the user
    const handleConfirm = () => {
        console.log("Confirmed!");
        setTodos([])
        handleClose();
        setInputVal('')
        setEditItem({
            id: null,
            isEditToggled: false,
        })
    };

    // Function to handle action buttons behaviour
    const handleActions = (indx, checked = "") => {
        setTodos(
            todos.map((todo, i) => {
                if (i === indx) {
                    return {
                        ...todo,
                        checked: checked !== "" ? checked : !todo.checked,
                    };
                }
                return todo;
            })
        );
    };

    // Function to close action buttons when mouse exits note Item
    const handleMouseLeave = (indx) => {
        handleActions(indx, false)
    }

    // Storing the todos in local storage of the browser
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <div className='main'>
            <div className='container_Main'>
                <h1 className='heading_Main'>What's on your calendar today?</h1>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                    }}
                >
                    <TextField fullWidth label="Enter todo's" id="fullWidth" value={inputVal} onChange={inputEvent} className='input_Main' autoComplete='off' />
                </Box>
                <div className="btn-container">
                    <Button variant="contained" className='btn_Main btn2' onClick={addTodo}>{!editItem.isEditToggled ? "Add" : "Update"}</Button>
                    <Button variant="outlined" className='btn_Main btn2' onClick={resetInput}>Reset</Button>
                    <Button variant="outlined" className='btn_Main btn2' onClick={handleOpen}>Delete All</Button>
                </div>
                <CustomModal showModal={showModal} handleClose={handleClose} handleConfirm={handleConfirm} />
            </div>
            <div className="notes_container_Main">
                {todos.map((todoItem, indx) => {
                    return (
                        <div className='note_Main' key={indx} onMouseLeave={() => handleMouseLeave(indx)}>
                            <div className='noteItem'>
                                {todoItem.todo}
                                <label htmlFor={`reveal-actions-${indx}`} className="action-toggle-btn"><BsThreeDots /></label>
                                <input
                                    type="checkbox"
                                    id={`reveal-actions-${indx}`}
                                    role="button"
                                    checked={todoItem.checked ? "checked" : ""}
                                    onChange={() => handleActions(indx)}
                                />
                                <div id="action-container" className="action-container">
                                    <button type="button" className="action-btn edit" onClick={() => editTodo(todoItem.id, todoItem.todo)}><MdModeEditOutline /></button>
                                    <button type="button" className="action-btn delete" onClick={() => deleteTodo(todoItem.id)}><MdDelete /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Main