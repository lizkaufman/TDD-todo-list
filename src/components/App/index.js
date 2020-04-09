import React, { useReducer, useState } from 'react';
import './App.css';

import { ADD_TODO, DELETE_TODO, COMPLETE_TODO } from './actionTypes';

//need to export so that I can import in the test file
export function reducer(todoList, { type, payload }) {
  //want to take in state and action and match the type to determine what it does
  // type and payload destructured in place from action
  switch (type) {
    case ADD_TODO:
      const todo = {
        todoTitle: payload?.todoTitle || 'something to do',
        completed: false,
        priority: 1,
      }; //takes in the todo title from the payload of the action; the completed and priority are set as false and 1 as defaults
      return [...todoList, todo];
    case DELETE_TODO:
      // const index = payload; //payload is index of specific todo to delete in the todo array
      return [
        ...todoList.slice(0, payload.index),
        ...todoList.slice(payload.index + 1),
      ]; //the ollld spread'n'slice
    case COMPLETE_TODO:
      return [
        ...todoList.slice(0, payload),
        { ...todoList[payload.index], completed: true },
        ...todoList.slice(payload.index + 1),
      ];
    default:
      return todoList;
  }
}

function App() {
  const [todoList, dispatch] = useReducer(reducer, []);
  const [todoInput, setTodoInput] = useState('');

  function addToList() {
    dispatch({ type: ADD_TODO, payload: { todoTitle: todoInput } });
    console.log({ todoList });
  }

  return (
    <div>
      <input value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
      <button
        // onClick={() => {
        //   dispatch({ type: ADD_TODO, payload: { todoTitle: todoInput } });
        //   console.log(todoList);
        // }}
        onClick={addToList}
      >
        Add item
      </button>
    </div>
  );
}
//TODO: link to state from input field and get the title from that
//TODO: map over todos to display
export default App;
