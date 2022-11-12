import React, {useEffect, useState} from 'react';
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import db from '../firebase';
import { Link } from 'react-router-dom';
import ListItem from '../components/ListItem';

interface ListTodo {
  id: string;
  title: string;
  desc: string;
  status: string;
  create: string;
  deadline: string;
}

interface FILTER {
  status: string;
}

const List = () => {
  const [todos, setTodos] = useState<ListTodo[]>([]);
  const [filter, setFilter] = useState<FILTER>({status: ''});
  const [order, setOrder] = useState<string>('create-new');
  useEffect(() => {
    const a = orderBy("timestamp", "desc");
    const queryOrder = order === 'deadline-near' ? orderBy("deadline", "asc") : orderBy("timestamp", order === 'create-new' ? "desc" : "asc");
    const todoDB = query(collection(db, "todos"), queryOrder);
    onSnapshot(todoDB, newDB => {
      const newData: any[] = newDB.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setTodos(newData);
    });
  }, [order]);

  const changeFilterStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({...filter, status: e.target.value });
  }

  const changeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  }

  return (
    <>
      <h1 style={{marginBottom: '0'}}>TODO一覧</h1>
      <Link to={'/new/'} style={{display: 'inline-block',margin: '20px 0'}}>新規作成</Link><br />
      <span>表示するステータス：</span>
      <select name="status" value={filter.status} onChange={changeFilterStatus}>
        <option value="">全て</option>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select><br/>
      <span>並び順：</span>
      <select name="order" value={order} onChange={changeOrder}>
        <option value="create-new">作成日が新しい順</option>
        <option value="create-old">作成日が古い順</option>
        <option value="deadline-near">期限が早い順</option>
      </select>
      <ul>
        { todos.map(todo => {
            return (
              (!filter.status || todo.status === filter.status) && <li key={todo.id}><ListItem todo={todo} /></li>
            );
          })
        }
      </ul>
    </>
  );
}

export default List;
