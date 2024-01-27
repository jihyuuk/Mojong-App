import React from 'react';
import { Badge, ListGroup } from "react-bootstrap";
import Item from '../../domain/Item';
import Category from '../../domain/Category';

function Section() {

  // 테스트 데이터
  const item1 = new Item("꿀고구마", "베니하루까 제일 잘 나감", 10000);
  const item2 = new Item("호박고구마", "잎이 얼룩덜룩", 11000);
  const item3 = new Item("밤고구마", "퍽퍽함 많이 안 나감", 9000);
  item3.countUP();
  item3.countUP();
  item3.countUP();
  item3.countUP();

  const category1 = new Category("고구마");
  const category2 = new Category("토마토");
  category1.addItem(item1);
  category1.addItem(item2);
  category1.addItem(item3);

  const categoryList = [category1,category2]
  //테스트 데이터 끝

  return (
    <>
      {categoryList.map((category, index) => (

        <ListGroup key={index} id={`section${index}`} variant='flush' className='border-top shadow-sm my-2 bg-white'>
          {/* 카테고리 출력부분 */}
          <ListGroup.Item className='fs-3 fw-bold text-bold border-0 py-3'>{category.name}</ListGroup.Item>
  
           {/* 카테고리의 아이템들 출력 부분*/}
          {category.itemList.map((item, itemIndex) => (
  
            <ListGroup.Item key={itemIndex} className='fs-5 fw-semibold py-3'>
              <div className='d-flex align-items-center'>
                <span className='m-0 me-2'>{item.name}</span> {item.count !== 0 && <Badge pill bg="danger">{item.count}</Badge>} 
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