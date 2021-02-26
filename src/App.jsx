import React, { useState } from 'react';
import './styles.css';

export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setInCompleteTodos] = useState(['ランニング', '0秒思考']);
  const [completeTodos, setCompleteTodos] = useState(['瞑想']);

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

  return (
    <>
      <div　className ="input-area">
        <input placeholder = "TODOを入力" value = {todoText} onChange = {onChangeTodoText} />
        <button onClick = {onClickAdd} >追加</button>
      </div>
      <div className ="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key = {todo} className="list-row">
                <li>{todo}</li>
                <button onClick = { () => onClickComplete(index) }>完了</button>
                <button onClick = { () => onClickDelete(index) } >削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className ="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <div key= {todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
