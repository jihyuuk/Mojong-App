import React from 'react';

function Section(props) {

    const items = props.items;

    //모달 열기,닫기 관련
    // const [clickedItem, setClickedItem] = useState();
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const handleClick = (item) => {
    //     setClickedItem(item);
    //     handleShow();
    // }

    return (
        <section className='my-content'>

            <div className='p-2 fw-midium text-secondary'>총 <span className='fw-semibold'>{items.length}</span>개</div>

            <div className='row row-cols-2 row-cols-md-3 g-2'>

                {items.map((item, index) => (

                    <div key={index} className='col'>
                        <div className='card h-100 shadow-sm'>
                            <div className='card-body'>
                                <div className='fs-4 fw-semibold'>{item.name}</div>
                                <div className='text-secondary my-2'>{item.description}</div>
                            </div>
                            <div className='card-footer text-center'>
                                <div className='fs-5'>{item.price}원</div>
                            </div>
                        </div>
                    </div>

                ))}

            </div>

        </section>
    )

}

export default Section;