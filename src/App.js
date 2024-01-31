import React, { useEffect, useState, createContext } from 'react';
import { fetchData } from './domain/TestDatas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componets/home/Home';

export const DataContext = createContext();


function App() {

  // 서버에서 데이터 받아오기
  const [data, setData] = useState([]);


  useEffect(() => {

    setData(fetchData());

  }, []);


  return (
    <div id='mojong-app' className='bg-body-tertiary'>
      <DataContext.Provider value={data}>
        <BrowserRouter>
          <Routes>
            {/* 홈 화면 */}
            <Route path='/' element={<Home/>}></Route>
            {/* <Route path='/shopping-cart' element={}></Route> */}
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export default App;
