import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componets/home/Home';
import ShoppingCart from './componets/shoppingCart/ShoppingCart';
import LoginPage from './componets/login/LoginPage';
import JoinPage from './componets/login/JoinPage';
import PrivateRoute from './componets/router/PrivateRouter';
import axios from 'axios';

export const DataContext = createContext(null);
export const ShoppingCartContext = createContext(null);
export const TokenContext = createContext(null);

function App() {

  // 서버에서 데이터 받아오기
  const [data, setData] = useState([]);
  //장바구니
  const [cart, setCart] = useState([]);
  //토큰
  const [token, setToken] = useState();
  //로딩
  const [loading, setLoading] = useState(true);

  //로그인 로직
  useEffect(() => {
    //토큰 존재여부로 로그인 판단
    //만료일 지났어도 바로 서버에 데이터 요청하기때문에 만료여부 알 수 있음
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      //토큰 존재시
      setToken(jwtToken);
      console.log("토큰존재")
    } else {
      //토큰 없으면 token = null
      setLoading(false);
      console.log("토큰없음")
    }

  }, []);


  useEffect(() => {
    //토큰 등록시에 서버에서 data받아오기
    if (!token) return;
    fetchData(token);
  }, token);


  //서버에서 데이터 가져오기
  const fetchData = async (jwtToken) => {
    //1.서버에 토큰가지고 모종 데이터 요청
    //2.서버 응답 : 200, 201, 403
    //    200: 모종데이터
    //    201: 모종데이터,새토큰
    //    403: 존재하는 토큰 지우기
    try {
      const response = await axios.get('http://192.168.0.3:8080/init', {
        headers: {
          'Authorization': jwtToken
        }
      });

      if (response.status === 200) {
        //데이터 불러오기성공시
        setData(response.data.mojongData);

      } else if (response.status === 201) {
        //토큰갱신
        const newToken = response.headers.get('Authorization');
        localStorage.setItem('jwtToken', newToken);
        setToken(newToken);

        setData(response.data.mojongData);
        console.log("토큰이 갱신되었습니다.");

      } else {
        //지정하지 않은 상태코드
        console.error('서버 응답 상태코드 에러 : ' + response.status)
      }

    } catch (error) {
      if (error.response && error.response.status === 403) {
        //토큰 지우기
        setToken();
        localStorage.removeItem('jwtToken');
        console.error('권한이 없습니다.');
      } else {
        console.error('서버 연결 중 오류 발생.', error.message);
      }
    }

    //로딩끝
    setLoading(false);
  }


  //로딩화면
  if (loading) {
    return (
      <div class="d-flex flex-column justify-content-center" style={{paddingTop:'18em'}}>
        <div class="spinner-border m-auto" role="status">
        </div>
        <p className='fs-5 text-center mt-3'>데이터 불러오는 중...</p>
      </div>
    );
  }


  return (
    <div id='mojong-app' className='bg-body-tertiary'>
      <TokenContext.Provider value={{ token, setToken }}>
        <DataContext.Provider value={data}>
          <ShoppingCartContext.Provider value={{ cart, setCart }}>
            <BrowserRouter>
              <Routes>
                {/* 로그인 필요 O */}
                <Route element={<PrivateRoute />}>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/shopping-cart' element={<ShoppingCart />}></Route>
                </Route>

                {/* 로그인 필요 X */}
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/join' element={<JoinPage />}></Route>
              </Routes>
            </BrowserRouter>
          </ShoppingCartContext.Provider>
        </DataContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
