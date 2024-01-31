import React, { useEffect, useState, createContext } from 'react';
import Header from './componets/header/Header';
import Category from './componets/category/Category';
import Section from './componets/section/section';
import { fetchData } from './domain/TestDatas';
import AddCartModal from './componets/modal/AddCartModal';

export const DataContext = createContext(); 


function App() {

  // 서버에서 데이터 받아오기
  const [data,setData] = useState([]);


  useEffect(()=>{

    setData(fetchData());

  }, []);


  return (
    <DataContext.Provider value={data}>
        <div id='mojong-app' className='bg-body-tertiary'>

          <div className='sticky-top bg-white'>
            <Header></Header>
            <Category></Category>
          </div>

          <Section></Section>

          <footer style={{ height: 200}}>
          </footer>

        </div>
    </DataContext.Provider>
  );
}

export default App;
