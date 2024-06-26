import React, { useEffect, useState } from 'react';
import Category from './category/Category';
import Header from './header/Header';
import Section from './section/Section';
import GoToCart from './bottomBtn/GoToCart';
import ItemModal from '../modal/ItemModal';
import { useMojong } from '../../custom/provider/MojongContext';

function Home() {

    //모종데이터
    const { mojongs } = useMojong();

    //카테고리 관련
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [items, setItems] = useState([]);

    //검색창 관련
    const [input, setInput] = useState('');

    //모달
    const [show, setShow] = useState(false);
    const [modalItem, setModalItem] = useState({name:'',quantity:'',description:'',price:0});
    const handleShow = (item) => {
        setModalItem(item);
        setShow(true);
    }
    const handleClose = (clearInput) => {
        if(clearInput){
            setInput('');
        }

        setShow(false);
    }


    //카테고리 바뀌면 내용 바꾸기
    useEffect(() => {
        if (mojongs[selectedCategory]) {
            setItems(mojongs[selectedCategory].items);
        }
    }, [selectedCategory, mojongs]);



    return (
        <div id='home' className='h-100'>
            <div className='my-container'>

                {/* 헤더 */}
                <Header handleShow={handleShow} input={{input,setInput}}></Header>

                {/* 카테고리 */}
                <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Category>

                {/* 센션*/}
                <Section items={items} handleShow={handleShow}></Section>

                {/*하단 장바구니 버튼 */}
                <GoToCart></GoToCart>

                {/* 아이템 모달 */}
                <ItemModal modal={{show,modalItem,handleClose}}/>

            </div>
        </div>
    );
}

export default Home;