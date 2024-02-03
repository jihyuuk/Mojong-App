import React, { useEffect, useState, createContext } from 'react';
import { fetchData } from './domain/TestDatas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componets/home/Home';
import ShoppingCart from './componets/shoppingCart/ShoppingCart';
import LoginPage from './componets/login/LoginPage';
import JoinPage from './componets/login/JoinPage';

export const DataContext = createContext();
export const ShoppingCartContext = createContext();

function App() {

  // 서버에서 데이터 받아오기
  const [data, setData] = useState([]);
  //장바구니
  const [cart,setCart] = useState([]);


  useEffect(() => {
    setData(fetchData());
  }, []);


  return (
    <div id='mojong-app' className='bg-body-tertiary'>
      <DataContext.Provider value={data}>
        <ShoppingCartContext.Provider value={{cart,setCart}}>
          <BrowserRouter>
            <Routes>
              {/* 홈 화면 */}
              <Route path='/' element={<Home />}></Route>
              <Route path='/shopping-cart' element={<ShoppingCart />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/join' element={<JoinPage />}></Route>
            </Routes>
          </BrowserRouter>
        </ShoppingCartContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default App;
