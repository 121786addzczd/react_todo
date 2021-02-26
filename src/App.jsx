import React, { useState } from 'react';
import './styles.css';
import { InputTodo } from './components/InputTodo';
import { InCompleteTodos } from './components/InCompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';

export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setInCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    setTodoText('');
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setInCompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setInCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setInCompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText = {todoText}
        onChange = {onChangeTodoText}
        onClick= {onClickAdd}
        disabled = {incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style = {{ color: 'red' }}>
          登録できるtodoは5個までになります
        </p>
      )}
      <InCompleteTodos
        todos = {incompleteTodos}
        onClickComplete ={onClickComplete}
        onClickDelete = {onClickDelete}
      />
      <CompleteTodos todos = {completeTodos} onClickBack = {onClickBack} />
    </>
  );
};
