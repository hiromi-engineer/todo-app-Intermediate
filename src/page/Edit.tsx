import React, {useEffect, useState} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { useRecoilState } from 'recoil';
import { todoAtom, EditTodo } from '../Atom';

const Edit = () => {
  const [searchParams] = useSearchParams();
  const [todo, setTodo] = useRecoilState(todoAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const id = searchParams.get('id');
  const navigate = useNavigate();
  useEffect(() => {
    if(id) {
      const decRef = doc(db, 'todos', id);
      getDoc(decRef).then( data => {
        const todoData = data.data();
        if(todoData) {
          setTodo({title: todoData.title, desc: todoData.desc, status: todoData.status, deadline: todoData.deadline});
          setLoading(false);
        } else {
          navigate('/');
        }
      } );
    } else {
      navigate('/');
    }
  }, []);
  const editTodo = ( todo: EditTodo ): void => {
    if(id) {
      const washingtonRef = doc(db, "todos", id);
      updateDoc(washingtonRef, {...todo});
      navigate('/');
    }
  }
  const deleteTodo = (): void => {
    if(id) {
      deleteDoc(doc(db, "todos", id));
      navigate('/');
    }
  }
  return (
    <>
      {!loading && <>
        <h1>TODOの編集</h1>
        <Form submitFunc={editTodo} deleteFunc={deleteTodo} />
        <Link to={'/'} style={{display: 'inline-block',marginTop: '20px'}}>戻る</Link>
      </>
      }
    </>
  )
}

export default Edit;
