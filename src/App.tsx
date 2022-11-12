import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './page/List';
import New from './page/New';
import Edit from './page/Edit';
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<List />} />
            <Route path='/new/' element={<New />} />
            <Route path='/edit/' element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;