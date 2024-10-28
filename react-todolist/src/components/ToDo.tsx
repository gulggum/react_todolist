import { useSetRecoilState } from "recoil";
import { ITodo, toDoState, Categories } from "../atoms";
import React from "react";
import styled from "styled-components";

const TodoList = styled.li`
  margin-top: 5px;
  button {
    background: none;
    border: none;
    cursor: pointer;
    background-color: gainsboro;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 10px;
    &:last-child {
      background: none;
    }
  }
`;

function ToDo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      console.log("😍", targetIndex, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDeleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => oldToDos.filter((todo) => todo.id !== id));
  };
  return (
    <TodoList>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={onDeleteToDo}>❌</button>
    </TodoList>
  );
}

export default ToDo;
