import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Coins from './components/Coins/Coins';
import Coin from './components/routes/Coin';

import './index.css';


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Coins  />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
