import React, { useState } from 'react';

function Section(props) {

    const items = props.items;

    //모달 관련
    const handleShow= props.handleShow;

    return (
        <section className='my-content px-2'>

            <div className='p-2 fw-midium text-secondary'>총 <span className='fw-semibold'>{items.length}</span>개</div>

            <div className='row row-cols-2 row-cols-md-3 g-2'>

                {items.map((item, index) => (

                    <div key={index} className='col'>
                        <div className='card h-100 shadow-sm' onClick={()=>{handleShow(item)}}>
                            <div className='card-body'>
                                <div className='fs-4 fw-semibold'>{item.name}</div>
                                <div className='text-secondary my-2'>{item.description}</div>
                            </div>
                            <div className='card-footer text-center'>
                                <div className='fs-5'>{item.price.toLocaleString('ko-KR')}원</div>
                            </div>
                        </div>
                    </div>

                ))}

            </div>
            
        </section>
    )

}

export default Section;