import { atom } from "recoil";

export interface EditTodo {
  title: string;
  desc: string;
  status: string;
  deadline: string;
}
export const defaultTodo :EditTodo = {title: '', desc: '', status: '未着手', deadline: ''}
export const todoAtom = atom({
  key: 'todo',
  default: defaultTodo,
})