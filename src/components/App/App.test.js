import React from 'react';
import { reducer } from './index';

import { ADD_TODO, DELETE_TODO, COMPLETE_TODO } from './actionTypes';

//Take obvious steps without testing if 100% comfortable with them!

//Chris: nice to separate logic from UI; makes it easier to test in react; so testing the reducer function logic here separate from what's rendered
//Bare minimum TDD is on the reducer logic (simpler and less scary than testing the UI!)

describe('reducer', () => {
  it('should add a todo', function () {
    const initialState = []; //initial state is array of todos
    const todoTitle = 'Buy milk';
    const todo = { todoTitle, completed: false, priority: 1 };
    const actual = reducer(initialState, {
      type: ADD_TODO,
      payload: { todoTitle: todoTitle },
    }); //hands in initial state and object for action (type and payload)
    expect(actual.length).toBe(1);
    expect(actual[0]).toEqual(todo);
    //toEqual instead of toBe since it's hard to directly compare arrays and objects (toBe requires exact comparison)
  });
  it('should add a todo with default values', function () {
    const initialState = []; //initial state is array of todos
    const expected = {
      todoTitle: 'something to do',
      completed: false,
      priority: 1,
    };
    const actual = reducer(initialState, {
      type: ADD_TODO,
    }); //hands in initial state and object for action (type and payload)
    expect(actual.length).toBe(1);
    expect(actual[0]).toEqual(expected);
    //toEqual instead of toBe since it's hard to directly compare arrays and objects (toBe requires exact comparison)
  });
  it('should delete a todo', function () {
    const todo = { todoTitle: 'Buy milk', completed: false, priority: 1 };
    const initialState = [todo];
    const expected = [];
    const actual = reducer(initialState, {
      type: DELETE_TODO,
      payload: { index: 0 },
    }); //payload is index of todo (to tell it which one)
    expect(actual).toEqual(expected);
  });
  it('should mark a todo as complete', function () {
    const todo = { todoTitle: 'Buy milk', completed: false, priority: 1 };
    const initialState = [todo];
    const expected = [{ ...todo, completed: true }];
    const actual = reducer(initialState, {
      type: COMPLETE_TODO,
      payload: { index: 0 },
    }); //payload is index of todo (to tell it which one)
    expect(actual.length).toBe(1); //still want only one thing
    expect(actual[0].completed).toBe(true);
  });
});
