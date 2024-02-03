import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { DataContext } from '../../../App';

function SearchField(props) {

    const data = useContext(DataContext);
    const input = props.input;
    const [findData, setFindData] = useState([]);


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

    return (
        <>
            {input.length > 0 &&
                <div className='position-absolute top-0 start-0 z-1' style={{ width: '100%' }}>
                    <div className='mx-2'>
                        <ListGroup variant="flush" className='rounded-bottom-4 shadow'>
                            {findData.length <= 0 &&
                                <ListGroup.Item variant="light" className='py-3'>
                                    검색 결과 없음
                                </ListGroup.Item>}
                                
                            {findData.map((item, index) => (
                                <ListGroup.Item key={index} variant="light" className='py-3'>
                                    {item.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            }
        </>

    );

}

export default SearchField;