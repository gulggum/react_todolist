import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const { persistAtom } = recoilPersist();

export const enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [
    persistAtom, // persistAtom을 사용하여 상태를 로컬 스토리지에 저장
  ],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// export const toDoSelector = selector({
//   key: "toDoSelector",
//   get: ({ get }) => {
//     const toDos = get(toDoState);
//     const category = get(categoryState);
//     return toDos.filter((toDo) => toDo.category === category);
//   },
// });

export const errorMessageState = atom({
  key: "errorMessageState",
  default: "",
});

export const todoSelectorTodo = selector({
  key: "todoSelectorTodo",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return toDos.filter((todo) => todo.category === "TO_DO");
  },
});

export const todoSelectorDoing = selector({
  key: "todoSelectorDoing",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return toDos.filter((todo) => todo.category === "DOING");
  },
});

export const todoSelectorDone = selector({
  key: "todoSelectorDone",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return toDos.filter((todo) => todo.category === "DONE");
  },
});
