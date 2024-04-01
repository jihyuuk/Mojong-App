import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMojong } from '../../../custom/provider/MojongContext';

function SearchField(props) {

    //전체데이터
    const { mojongs } = useMojong();

    //검색데이터
    const input = props.input;
    const setInput = props.setInput
    const [findData, setFindData] = useState([]);

    //보여주기 여부
    const show = props.show;
    const setShow = props.setShow;

    //input이 바뀔때마다
    useEffect(() => {
        if (input === '') {
            setFindData([]);
            return;
        }

        //데이터에서 찾아오기
        const finds = [];
        mojongs.forEach((cateogry) => {
            cateogry.items.forEach(item => {
                if (item.name.includes(input) || input.includes(item.name)) {
                    finds.push(item);
                }
            })
        })

        //찾은데이터 없데이트 하기
        setFindData(finds);
    }, [input]);

    //검색창닫기
    const showColse = () => {
        setShow(false)
        const searchBar = document.getElementById('searchBar');
        searchBar.blur();
    }

    if (!show || input.length <= 0) {
        return <></>;
    }

    return (
        <>
            {/* 연관검색어 */}
            <div className='position-relative' >
                <div className='position-absolute top-0 start-0 w-100 z-2'>
                    <ListGroup variant="flush" className='shadow'>
                        {findData.length <= 0 &&
                            <ListGroup.Item variant="light" className='py-3 d-flex justify-content-between'>
                                <div className='ms-2'>검색 결과 없음</div>
                                <Link to='/custom-item?fromHome=true' className='text-decoration-none'>
                                    + 직접입력
                                </Link>
                            </ListGroup.Item>}

                        {findData.map((item, index) => (
                            <ListGroup.Item key={index} variant="light" className='py-3' onClick={() => props.modalShow(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search me-2 text-secondary" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                                {item.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>

            {/* 기타배경 */}
            <div className='position-absolute top-0 start-0 bg-secondary bg-opacity-50 w-100 h-100  z-1' onClick={() => showColse()} onTouchMove={() => showColse()}></div>
        </>

    );

}

export default SearchField;