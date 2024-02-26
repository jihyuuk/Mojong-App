import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useInitData } from '../../../custom/provider/InitDataContext';
import SubHeader from '../../../componets/common/SubHeader';

function CreateProduct() {

    const { mojongs, setMojongs, refreshMojongs } = useInitData();

    //인풋값
    const [category, setCategory] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    //검증
    const [invalidName, setInvaildName] = useState(false);
    const [invalidPrice, setInvaildPrice] = useState(false);
    const [fbName, setFbName] = useState('');
    const [fbPrice, setFbPrice] = useState('');

    //검증
    const validate = () => {
        if (name === '' || price === '') {
            if (name === '') {
                setFbName('상품명은 필수입니다.');
                setInvaildName(true);
            }
            if (price === '') {
                setFbPrice('가격은 필수입니다.');
                setInvaildPrice(true);
            }
            return false;
        }

        if (price < 0) {
            setFbPrice('가격은 0보다 커야합니다.');
            setInvaildPrice(true);
            return false;
        }

        return true;
    }

    //가격 onChange함수
    const priceChange = (value) => {

        console.log(value);

        setInvaildPrice(false);

        //빈값
        if (!value) {
            setPrice('');
            return;
        }

        //숫자일때만 적용
        if (!isNaN(value)) {
            setPrice(Number(value));
            return;
        }
    }

    //이름 onChange함수
    const nameChange = (value) => {
        setInvaildName(false);
        setName(value);
    }

    //추가하기버튼
    const submit = () => {
        //검증실행
        if(!validate()) return;

        alert('hi')
    }


    return (
        <div className='position-absolute w-100 h-100 z-5'>

            <div className='my-container'>

                <SubHeader value='상품추가' to='/'></SubHeader>

                <div className='my-content p-3'>
                    <Form>
                        {/* 카테고리 */}
                        <Form.Group className="mb-3">
                            <Form.Label className='fs-5 fw-medium text-success'>카테고리</Form.Label>
                            <Form.Select size="lg">
                                {mojongs.map((mojong, index) => (
                                    <option key={index} value={index}>{mojong.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* 이름 */}
                        <Form.Group className="mb-3">
                            <Form.Label className='fs-5 fw-medium text-success'>상품명</Form.Label>
                            <Form.Control size="lg" type="text" placeholder='ex) 상품A' isInvalid={invalidName} value={name} onChange={(e) => nameChange(e.target.value)} />
                            <FormControl.Feedback type='invalid'>{fbName}</FormControl.Feedback>
                        </Form.Group>

                        {/* 설명 */}
                        <Form.Group className="mb-3">
                            <Form.Label className='fs-5 fw-medium text-success'>설명란</Form.Label>
                            <Form.Control size="lg" type="text" placeholder='ex) 50구 / 청색판' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        {/* 가격 */}
                        <Form.Group className="mb-3">
                            <Form.Label className='fs-5 fw-medium text-success'>가격</Form.Label>
                            <Form.Control size="lg" type="text" pattern="\d*" inputMode="numeric" placeholder='ex) 500원' isInvalid={invalidPrice} value={price} onChange={(e) => priceChange(e.target.value.trim())} />
                            <FormControl.Feedback type='invalid'>{fbPrice}</FormControl.Feedback>
                        </Form.Group>
                    </Form>
                </div>

                <div className='mt-auto w-100 bg-white p-2'>
                    <Button variant='success' className='w-100' onClick={() => submit()}>추가하기</Button>
                </div>
            </div>
        </div>
    );

}

export default CreateProduct;