import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoAtom, EditTodo } from '../Atom';
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  submitFunc: ( todo:EditTodo ) => void;
  deleteFunc?: () => void;
}

interface FormInput {
  title: string;
  status: string;
  deadline: string;
  desc: string;
}

const Form = ({submitFunc, deleteFunc} : Props) => {
  const todo = useRecoilValue(todoAtom);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>(
    {defaultValues: {...todo}}
  );

  const statuses = ['未着手', '進行中', '完了'];

  const onSubmit: SubmitHandler<FormInput> = data => {
    submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>タイトル</label><br/>
      <input
      type="text"
      {...register("title", { 
        required: {value: true, message: 'タイトルは必須です' }
      })}
      /><br/>
      {errors.title && <p style={{color: 'red', display: 'inline-block', margin: '0'}}>{errors.title.message}</p>}
      <label style={{display: 'block',marginTop: '5px'}}>状態</label>
      <select
      {...register("status", { required: false })}
      >
        {statuses.map(status => <option value={status}>{status}</option>)}
      </select><br />
      <label style={{display: 'block',marginTop: '5px'}}>期限</label>
      <input
      type="date"
      {...register("deadline", { 
        required: {value: true, message: '期限は必須です' }
      })}
      /><br/>
      {errors.deadline && <p style={{color: 'red', display: 'inline-block', margin: '0'}}>{errors.deadline.message}</p>}
      <label style={{display: 'block',marginTop: '5px'}}>詳細</label>
      <textarea
      {...register("desc", { required: false })}
      ></textarea><br/>
      <button>完了</button>
      {deleteFunc && <button onClick={deleteFunc}>削除</button>}
    </form>
  )
}

export default Form;
