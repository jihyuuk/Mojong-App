import React, { useEffect, useState, createContext } from 'react';
import { fetchData } from './domain/TestDatas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componets/home/Home';
import ShoppingCart from './componets/shoppingCart/ShoppingCart';
import LoginPage from './componets/login/LoginPage';
import JoinPage from './componets/login/JoinPage';
import PrivateRoute from './componets/router/PrivateRouter';

export const DataContext = createContext(null);
export const ShoppingCartContext = createContext(null);
export const AuthContext = createContext(null);

function App() {

  // 서버에서 데이터 받아오기
  const [data, setData] = useState([]);
  //장바구니
  const [cart,setCart] = useState([]);

  //jwt존재 여부 판별
  // useEffect(()=>{

  //   const storedToken = localStorage.getItem("token");
  //   if(storedToken){
  //     //토큰있는 경우만
  //     setToken(storedToken);
  //   }

  // },[]);


  //데이터 가져오기
  useEffect(() => {
    setData(fetchData());
  }, []);


  return (
    <div id='mojong-app' className='bg-body-tertiary'>
      <DataContext.Provider value={data}>
        <ShoppingCartContext.Provider value={{cart,setCart}}>
          <BrowserRouter>
            <Routes>
              {/* 로그인 필요 O */}
              <Route element={<PrivateRoute/>}>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/shopping-cart' element={<ShoppingCart />}></Route>
              </Route>
              
              {/* 로그인 필요 X */}
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
