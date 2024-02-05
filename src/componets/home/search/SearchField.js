import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { DataContext } from '../../../App';
import AddCartModal from '../modal/AddCartModal';

function SearchField(props) {

    //전체데이터
    const data = useContext(DataContext);
    //검색데이터
    const input = props.input;
    const [findData, setFindData] = useState([]);

    //보여주기 여부
    const show = props.show;
    const setShow = props.setShow;


    //모달관련    
    const [modalItem, setModalItem] = useState();
    const [showModal, setShowModal] = useState(false);
    const modalClose = () => { setShowModal(false) };


    //input이 바뀔때마다
    useEffect(() => {
        if (input === '') {
            setFindData([]);
            return;
        }

        //데이터에서 찾아오기
        const finds = [];
        data.forEach((cateogry) => {
            cateogry.items.forEach(item => {
                if (item.name.includes(input) || input.includes(item.name)) {
                    finds.push(item);
                }
            })
        })

        //찾은데이터 없데이트 하기
        setFindData(finds);
    }, [input]);

    //검색아이템 클릭시
    const handleClick = (item) => {
        setModalItem(item);
        setShowModal(true);
    }

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
        <div className='position-absolute top-0 start-0 z-1 bg-secondary bg-opacity-25' style={{ width: '100%' }}>
            <div>
                <ListGroup variant="flush" className='shadow'>
                    {findData.length <= 0 &&
                        <ListGroup.Item variant="light" className='py-3'>
                            검색 결과 없음
                        </ListGroup.Item>}

                    {findData.map((item, index) => (
                        <ListGroup.Item key={index} variant="light" className='py-3' onClick={() => handleClick(item)}>
                            {item.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <AddCartModal item={modalItem} show={showModal} handleClose={modalClose} />
            </div>
            <div className='vh-100' onClick={showColse} onTouchMove={showColse}></div>
        </div>

    );

}

export default SearchField;