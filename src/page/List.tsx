import React, {useEffect, useState} from 'react';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
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
  const [filter, setFilter] = useState<FILTER>({status: '全て'});
  const [order, setOrder] = useState<string>('create-new');
  useEffect(() => {
    const queryOrder = order === 'deadline-near' ? orderBy("deadline", "asc") : orderBy("timestamp", order === 'create-new' ? "desc" : "asc");
    const todoDB = query(collection(db, "todos"), queryOrder);
    onSnapshot(todoDB, newDB => {
      const newData: any[] = newDB.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setTodos(newData);
    });
  }, [order]);

  const statuses = ['全て', '未着手', '進行中', '完了'];
  const orderes = [
    {value: 'create-new', desc: '作成日が新しい順'},
    {value: 'create-old', desc: '作成日が古い順'},
    {value: 'deadline-near', desc: '期限が早い順'},
  ];

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
        {statuses.map(status => <option value={status}>{status}</option>)}
      </select><br/>
      <span>並び順：</span>
      <select name="order" value={order} onChange={changeOrder}>
        {orderes.map(item => <option value={item.value}>{item.desc}</option>)}
      </select>
      <ul>
        { todos.map(todo => {
            return (
              (filter.status === '全て' || todo.status === filter.status) && <li key={todo.id}><ListItem todo={todo} /></li>
            );
          })
        }
      </ul>
    </>
  );
}

export default List;
