import React, { useEffect } from 'react';
import Header from './componets/header/Header';
import Category from './componets/category/Category';
import Section from './componets/section/section';

function App() {

  useEffect(()=>{

    const datas = fetchData();
    console.log(datas)

  }, []);

  
  const fetchData = () =>{
    return ( 
      [
        {
          "category": "고구마",
          "items": [
            {"name": "호박고구마1", "description": "맛있게 구워진 호박고구마", "price": 9000},
            {"name": "호박고구마2", "description": "부드럽게 삶아낸 호박고구마", "price": 9000},
            {"name": "호박고구마3", "description": "특별한 소스로 맛을 낸 호박고구마", "price": 9000}
          ]
        },
        {
          "category": "고추",
          "items": [
            {"name": "고추1", "description": "매운 맛이 일품인 고추", "price": 8000},
            {"name": "고추2", "description": "적당히 매운 맛의 고추", "price": 7000},
            {"name": "고추3", "description": "안 매운 고추", "price": 6000}
          ]
        },
        {
          "category": "토마토",
          "items": [
            {"name": "토마토1", "description": "신선하고 달콤한 토마토", "price": 10000},
            {"name": "토마토2", "description": "유기농으로 재배한 토마토", "price": 12000},
            {"name": "토마토3", "description": "샐러드에 잘 어울리는 토마토", "price": 8000}
          ]
        },
        {
          "category": "과일",
          "items": [
            {"name": "사과", "description": "신선하고 달콤한 사과", "price": 15000},
            {"name": "바나나", "description": "달콤하고 부드러운 바나나", "price": 12000},
            {"name": "딸기", "description": "신선하고 산뜻한 딸기", "price": 18000}
          ]
        }
      ]
    );
  }

  return (
        <div id='mojong-app' className='bg-body-tertiary'>

          <div className='sticky-top bg-white'>
            <Header></Header>
            <Category></Category>
          </div>

          <Section></Section>

          <footer style={{ height: 200}}>
          </footer>

        </div>
  );
}

export default App;
