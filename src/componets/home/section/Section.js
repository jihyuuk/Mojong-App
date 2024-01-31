import React, { useContext, useState } from 'react';
import { ListGroup } from "react-bootstrap";
import AddCartModal from '../modal/AddCartModal';
import { DataContext } from '../../../App';

function Section() {

  const datas = useContext(DataContext);

      //모달 열기,닫기 관련
      const [clickedItem,setClickedItem] = useState();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const handleClick = (item) => {
        setClickedItem(item);
        handleShow();
      }
  

  return (
    <>
      {datas.map((data, index) => (

        <ListGroup key={index} id={`section${index}`} variant='flush' className='border-top shadow-sm my-2 bg-white'>
          {/* 카테고리 출력부분 */}
          <ListGroup.Item className='fs-3 fw-bold text-bold border-0 py-3'>{data.category}</ListGroup.Item>
  
           {/* 카테고리의 아이템들 출력 부분*/}
          {data.items.map((item, itemIndex) => (
  
            <ListGroup.Item key={itemIndex} className='fs-5 fw-semibold py-3 item' onClick={()=>{handleClick(item)}} >
              <div className='d-flex align-items-center'>
                <span className='m-0 me-2'>{item.name}</span> 
              </div>
              <p className='fw-light fs-6 mb-0 p-1'>{item.description}</p>
              <p className='fw-medium p-1 mb-0'>{item.price}원</p>
            </ListGroup.Item>
  
          ))}
  
        </ListGroup>))}

          {/* 모달 */}
        <AddCartModal item={clickedItem} show={show} handleClose={handleClose}></AddCartModal>
    </>
  )

}

export default Section;