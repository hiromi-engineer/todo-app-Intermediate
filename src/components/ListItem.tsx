import React from 'react';
import { Link } from 'react-router-dom';

interface ListTodo {
  id: string;
  title: string;
  desc: string;
  status: string;
  create: string;
  deadline: string;
}

const ListItem = ({todo} : {todo: ListTodo}) => {
  return (
    <div id={todo.id}>
      <h3 style={{fontSize: '1.2em', margin: '10px 0 0'}}>{todo.title}</h3>
      <p style={{fontSize: '0.8em', margin: '5px 0', fontWeight: 'bold'}}>{todo.status}</p>
      <p style={{fontSize: '0.8em', margin: '5px 0'}}>作成日：<time>{todo.create}</time> 期限：<time>{todo.deadline}</time></p>
      {todo.desc && <p style={{margin: '0 0 10px 0'}}>{todo.desc}</p>}
      <Link to={`/edit?id=${todo.id}`}>編集</Link>
    </div>
  )
}

export default ListItem;
