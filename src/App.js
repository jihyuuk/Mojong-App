import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componets/home/Home';
import ShoppingCart from './componets/shoppingCart/ShoppingCart';
import LoginPage from './componets/login/LoginPage';
import JoinPage from './componets/login/JoinPage';
import PrivateRoute from './custom/router/PrivateRouter';
import Receipt from './componets/receipt/Receipt';
import CustomItem from './componets/customItem/CustomItem';
import History from './componets/history/History';
import Check from './componets/check/Check';
import SaleDetail from './componets/saleDetail/SaleDetail';
import { CartProvider } from './custom/provider/CartContext';
import { TokenProvider } from './custom/provider/TokenContext';
import MemberPage from './admin/member/memberPage';
import AllHistoryPage from './admin/allHistory/AllHistoryPage';
import ProductPage from './admin/product/ProductPage';
import AdminRouter from './custom/router/AdminRouter';
import { AuthProvider } from './custom/provider/AuthContext';
import { MojongProvider } from './custom/provider/MojongContext';

function App() {

  return (
    <div id='mojong-app'>
      <TokenProvider>
        <AuthProvider>
          <MojongProvider>
            <CartProvider>

              <BrowserRouter>
                <Routes>

                  {/* 로그인 필요 X */}
                  <Route path='/login' element={<LoginPage />}></Route>
                  <Route path='/join' element={<JoinPage />}></Route>


                  {/* 로그인 필요 O */}
                  <Route element={<PrivateRoute />}>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/shopping-cart' element={<ShoppingCart />}></Route>
                    <Route path='/receipt' element={<Receipt />}></Route>
                    <Route path='/custom-item' element={<CustomItem />}></Route>
                    <Route path='/check' element={<Check />}></Route>

                    {/* 기록관련 */}
                    <Route path='/history' element={<History />}></Route>
                    <Route path='/sale/:id' element={<SaleDetail />}></Route>
                  </Route>


                  {/* 관리자 */}
                  <Route element={<AdminRouter />}>
                    <Route path='/member' element={<MemberPage />}></Route>
                    <Route path='/all-history' element={<AllHistoryPage />}></Route>
                    <Route path='/product' element={<ProductPage />}></Route>
                  </Route>

                </Routes>
              </BrowserRouter>
              
            </CartProvider>
          </MojongProvider>
        </AuthProvider>
      </TokenProvider>
    </div>
  );
}

export default App;
