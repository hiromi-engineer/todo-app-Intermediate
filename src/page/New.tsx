import React, {useEffect} from 'react';
import db from '../firebase';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { useRecoilState } from 'recoil';
import { todoAtom, EditTodo, defaultTodo } from '../Atom';

const New = () => {
  const [todo, setTodo] = useRecoilState(todoAtom);
  useEffect(() => {
    setTodo(defaultTodo);
  },[]);
  const navigate = useNavigate();
  const addTodo = ( todo: EditTodo ): void => {
    const now = new Date();
    const nowData = now.getFullYear().toString() + '-' + ( '0' + (now.getMonth() + 1).toString()).slice(-2) + '-' + ( '0' + now.getDate().toString()).slice(-2);
    try {
      addDoc(collection(db, "todos"), {...todo, create: nowData,timestamp: Timestamp.fromDate(now)});
      navigate('/');
    }  catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <>
      <h1>新規作成</h1>
      <Form submitFunc={addTodo} />
      <Link to={'/'} style={{display: 'inline-block',marginTop: '20px'}}>戻る</Link>
    </>
  )
}

export default New;
