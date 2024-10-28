import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import {
  todoSelectorTodo,
  todoSelectorDoing,
  todoSelectorDone,
} from "../atoms";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
  min-width: 400px;
  margin: 0 auto;
  padding: 30px;
`;
const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  font-weight: 600;
`;
const TodoBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  justify-content: space-between;
`;

const SubTitle = styled.h2`
  font-weight: 600;
  color: goldenrod;
  font-size: 18px;
  margin-bottom: 10px;
`;
const TodoBox = styled.div`
  border-radius: 10px;
  padding: 10px;
  background-color: white;
`;

function TodoList() {
  // const toDos = useRecoilValue(toDoSelector);
  const todoItems = useRecoilValue(todoSelectorTodo);
  const doingItems = useRecoilValue(todoSelectorDoing);
  const doneItems = useRecoilValue(todoSelectorDone);

  return (
    <Container>
      <Title>To Do List</Title>

      <CreateTodo />
      <TodoBoxContainer>
        <TodoBox>
          <SubTitle>Todo</SubTitle>
          {todoItems?.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </TodoBox>
        <TodoBox>
          <SubTitle>Doing</SubTitle>
          {doingItems?.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </TodoBox>
        <TodoBox>
          <SubTitle>Done</SubTitle>
          {doneItems?.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </TodoBox>
      </TodoBoxContainer>
    </Container>
  );
}

export default TodoList;
