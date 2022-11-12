import React from 'react';
import { useRecoilState } from 'recoil';
import { todoAtom, EditTodo } from '../Atom';
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  submitFunc: ( todo:EditTodo ) => void;
  deleteFunc?: () => void;
}

interface FormInput {
  title: string;
  deadline: string;
}

const Form = ({submitFunc, deleteFunc} : Props) => {
  const [todo, setTodo] = useRecoilState(todoAtom);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = () => {
    submitFunc(todo);
  };

  const changeTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({...todo, title: e.target.value});
  }
  const changeTodoDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo({...todo, desc: e.target.value});
  }
  const changeTodoStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTodo({...todo, status: e.target.value});
  }
  const changeTodoDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({...todo, deadline: e.target.value});
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>タイトル</label><br/>
      <input
      type="text"
      value={todo.title}
      {...register("title", { 
        required: {value: true, message: 'タイトルは必須です' }
      })}
      onChange={changeTodoTitle}
      /><br/>
      {errors.title && <p style={{color: 'red', display: 'inline-block', margin: '0'}}>{errors.title.message}</p>}
      <label style={{display: 'block',marginTop: '5px'}}>状態</label>
      <select name="status" value={todo.status} onChange={changeTodoStatus}>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select><br />
      <label style={{display: 'block',marginTop: '5px'}}>期限</label>
      <input
      type="date"
      value={todo.deadline}
      {...register("deadline", { 
        required: {value: true, message: '期限は必須です' }
      })}
      onChange={changeTodoDeadline}
      /><br/>
      {errors.deadline && <p style={{color: 'red', display: 'inline-block', margin: '0'}}>{errors.deadline.message}</p>}
      <label style={{display: 'block',marginTop: '5px'}}>詳細</label>
      <textarea name="newTodoDesc" value={todo.desc} placeholder="詳細" onChange={changeTodoDesc}></textarea><br/>
      <button>完了</button>
      {deleteFunc && <button onClick={deleteFunc}>削除</button>}
    </form>
  )
}

export default Form;
