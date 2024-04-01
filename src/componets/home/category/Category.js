import React from 'react';
import { useMojong } from '../../../custom/provider/MojongContext';

function Category(props) {

    const {mojongs} = useMojong();
    const selectedCategory = props.selectedCategory;
    const setSelectedCategory = props.setSelectedCategory;


    //카테고리 바 스크롤
    const scrollNav = (e) => {

        const element = e.target;

        //현재 선택된 카테고리 적용
        setSelectedCategory(e.target.textContent)

        //화면 중앙에 오게
        const container = document.getElementById('scroll-nav');
        const targetLeft = element.offsetLeft + (element.offsetWidth - container.clientWidth) / 2;

        container.scrollTo({
            left: targetLeft,
            behavior: 'smooth',
            ignoreCancelEvents: true
        });
    }

    return (
        <nav id='category'>
            <div id='scroll-nav' className='overflow-x-auto w-100 d-flex bg-white border-bottom fw-medium text-secondary shadow-sm'>
                {mojongs.map((mojong, index) => (
                    <div key={index} className={`py-2 px-3 fs-5 ${selectedCategory === mojong.name ? 'selected' : ''}`} onClick={(e) => scrollNav(e)}>
                        <span className='text-nowrap'>
                            {mojong.name}
                        </span>
                    </div>
                ))}
            </div>
        </nav>
    )

}

export default Category;

