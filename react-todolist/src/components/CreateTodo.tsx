import { useRecoilState, useSetRecoilState } from "recoil";
import {
  toDoState,
  categoryState,
  Categories,
  errorMessageState,
} from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SubmitBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  form {
    width: 350px;
  }
  span {
    display: block;
  }

  select {
    height: 40px;
    font-size: 17px;
    background: none;
    border: none;
    margin-right: 5px;
  }
`;
const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 80%;
    background: none;
    border: none;
    border-bottom: 1px solid white;
    height: 40px;
    font-size: 20px;
    margin: 10px 0px 10px 0px;
    padding: 10px;
  }
  button {
    width: 15%;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
  }
`;

interface IForm {
  todo: string;
}

function CreateTodo() {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [erroMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const onVaild = ({ todo }: IForm) => {
    if (!todo || todo.trim() === "") {
      setErrorMessage("할일을 입력해주세요");

      return;
    }
    console.log("입력값", todo);
    setToDos((oldToDos) => [
      { text: todo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("todo", "");
    setErrorMessage("");
  };
  const oninput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <SubmitBox>
      {erroMessage ? "할일을 입력해주세요" : null}
      <form onSubmit={handleSubmit(onVaild)}>
        <select value={category} onInput={oninput}>
          <option value={Categories.TO_DO}>Todo</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
        <Input>
          <input
            {...register("todo", { required: "Write todo" })}
            placeholder="Please write your todolist"
          ></input>
          <button>✔️</button>
        </Input>
      </form>
    </SubmitBox>
  );
}

export default CreateTodo;
