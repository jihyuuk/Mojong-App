import React, { useContext, useEffect, useState } from 'react';
import Category from './category/Category';
import Header from './header/Header';
import Section from './section/Section';
import GoToCart from './bottomBtn/GoToCart';
import Footer from '../common/Footer'
import { useInitData } from '../../custom/provider/InitDataContext';

function Home() {

    const {mojongs} = useInitData();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [items, setItems] = useState([]);


    //카테고리 바뀌면 내용 바꾸기
    useEffect(() => {
        const findMojong = mojongs.find((mojong) => mojong.category === selectedCategory);
        if(findMojong){
            setItems(findMojong.items);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if(mojongs.length > 0){
            setSelectedCategory(mojongs[0].category);
        }
    }, [mojongs])


    return (
        <div id='home' className='h-100'>
            <div className='my-container'>

                {/* 헤더 */}
                <Header></Header>

                {/* 카테고리 */}
                <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Category>

                {/* 센션*/}
                <Section items={items}></Section>

                {/*하단 장바구니 버튼 */}
                <GoToCart></GoToCart>

                {/* 푸터 */}
                <Footer value={'home'}></Footer>
                
            </div>
        </div>
    );
}

export default Home;