import React, {useEffect, useState} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import db from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { useSetRecoilState } from 'recoil';
import { todoAtom, EditTodo } from '../Atom';

const Edit = () => {
  const [searchParams] = useSearchParams();
  const setTodo = useSetRecoilState(todoAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataExist, setDataExist] = useState<boolean>(false);
  const id = searchParams.get('id') ?? '';
  const navigate = useNavigate();
  useEffect(() => {
      const decRef = id && doc(db, 'todos', id);
      decRef ? getDoc(decRef).then( data => {
        const todoData = data.data();
        todoData && setTodo({title: todoData.title, desc: todoData.desc, status: todoData.status, deadline: todoData.deadline}); 
        todoData && setDataExist(true);
        setLoading(false);
      } ) : setLoading(false);
  }, []);
  const editTodo = ( todo: EditTodo ): void => {
    const todoUpdate = doc(db, "todos", id);
    updateDoc(todoUpdate, {...todo});
    navigate('/');
  }
  const deleteTodo = (): void => {
    deleteDoc(doc(db, "todos", id));
    navigate('/');
  }
  return (
    <>
      {!loading && <>
        <h1>TODOの編集</h1>
        {dataExist ? <Form submitFunc={editTodo} deleteFunc={deleteTodo} /> : <p>編集するTODOが見つかりません</p>}
        <Link to={'/'} style={{display: 'inline-block',marginTop: '20px'}}>戻る</Link>
      </>
      }
    </>
  )
}

export default Edit;
