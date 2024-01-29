import React, { useContext } from 'react';
import { ListGroup } from "react-bootstrap";
import { DataContext } from '../../App';

function Section() {

  const datas = useContext(DataContext);

  return (
    <>
      {datas.map((data, index) => (

        <ListGroup key={index} id={`section${index}`} variant='flush' className='border-top shadow-sm my-2 bg-white'>
          {/* 카테고리 출력부분 */}
          <ListGroup.Item className='fs-3 fw-bold text-bold border-0 py-3'>{data.category}</ListGroup.Item>
  
           {/* 카테고리의 아이템들 출력 부분*/}
          {data.items.map((item, itemIndex) => (
  
            <ListGroup.Item key={itemIndex} className='fs-5 fw-semibold py-3'>
              <div className='d-flex align-items-center'>
                <span className='m-0 me-2'>{item.name}</span> 
              </div>
              <p className='fw-light fs-6 mb-0 p-1'>{item.description}</p>
              <p className='fw-medium p-1 mb-0'>{item.price}원</p>
            </ListGroup.Item>
  
          ))}
  
        </ListGroup>))}
    </>
  )

}

export default Section;