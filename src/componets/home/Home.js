import React, { useContext, useEffect, useState } from 'react';
import Category from './category/Category';
import Header from './header/Header';
import Section from './section/Section';
import GoToCart from './bottomBtn/GoToCart';
import Footer from '../common/Footer'
import { useInitData } from '../../custom/provider/InitDataContext';
import ItemModal from '../modal/ItemModal';

function Home() {

    const { mojongs } = useInitData();
    const [selectedCategory, setSelectedCategory] = useState('');
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
        const findMojong = mojongs.find((mojong) => mojong.name === selectedCategory);
        if (findMojong) {
            setItems(findMojong.items);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (mojongs.length > 0) {
            setSelectedCategory(mojongs[0].name);
        }
    }, [mojongs])


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