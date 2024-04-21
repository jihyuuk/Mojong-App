import React, {  useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useToken } from '../../../custom/provider/TokenContext';
import { useMojong } from '../../../custom/provider/MojongContext';
import axios from 'axios';

function CreateProduct(props) {

    const { mojongs, fetchMojong } = useMojong();

    //인풋값
    const [category, setCategory] = useState(-1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    //검증
    const [invalidCategory, setInvaildCategory] = useState(false);
    const [invalidName, setInvaildName] = useState(false);
    const [invalidPrice, setInvaildPrice] = useState(false);
    const [fbCategory, setFbCategory] = useState('');
    const [fbName, setFbName] = useState('');
    const [fbPrice, setFbPrice] = useState('');

    //서버연동
    const { token } = useToken();


    //검증
    const validate = () => {

        let valid = true;

        if (category === -1) {
            setFbCategory('카테고리를 선택해주세요');
            setInvaildCategory(true);
            valid = false;
        }

        if (name === '') {
            setFbName('상품명은 필수입니다.');
            setInvaildName(true);
            valid = false;
        }

        if (price <= 0) {
            setFbPrice('가격은 0보다 커야합니다.');
            setInvaildPrice(true);
            valid = false;
        }

        return valid;
    }

    //카테고리 onChange함수
    const categoryChange = (index) => {
        setInvaildCategory(false);
        setCategory(mojongs[index].id);
    }

    //이름 onChange함수
    const nameChange = (value) => {
        setInvaildName(false);
        setName(value);
    }

    //가격 onChange함수
    const priceChange = (value) => {

        setInvaildPrice(false);

        //빈값
        if (!value) {
            setPrice(0);
            return;
        }

        const number = value.replace(/,/g, '');
        //숫자일때만 적용
        if (!isNaN(number)) {
            setPrice(Number(number));
        }
    }

    //추가하기버튼
    const submit = () => {
        //검증실행
        if (!validate()) return;

        //서버반영
        axios.post(
            process.env.REACT_APP_API_URL + "/item",
            { 'categoryId': category, 'name': name, 'description': description, 'price': price },
            { headers: { 'Authorization': token } })
            .then(response => {
                //console.log("순서 변경 성공!");
                props.handleClose();
            }).catch(error => {
                //상품명중복
                if (error.response && error.response.status === 409) {
                    setFbName('이미 존재하는 상품명입니다.');
                    setInvaildName(true);
                    return;
                }

                alert("상품추가 실패!, 관리자에게 문의하세요")
            }).finally(() => {
                fetchMojong();
            })
    }


    return (
        <div className='position-absolute w-100 h-100 z-5'>
            <div className='my-container'>

                {/* 헤더 */}
                <header className='border-success-subtle border-bottom border-2 fw-bold fs-3 p-3 d-flex bg-white shadow-sm' >
                    {/* 뒤로가기 아이콘*/}
                    <div className='d-flex align-items-center text-secondary' onClick={() => { props.handleClose() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                    </div>

                    <p className='ms-3 mb-0'>상품추가</p>
                </header >

                <div className='my-content p-3'>
                    <Form>
                        {/* 카테고리 */}
                        <Form.Group className="mb-3">
                            <Form.Label className='fs-5 fw-medium text-success'>카테고리</Form.Label>
                            <Form.Select size="lg" defaultValue={-1} onChange={(e) => categoryChange(Number(e.target.value))} isInvalid={invalidCategory}>
                                <option value={-1} disabled >선택하기</option>
                                {mojongs.map((mojong, index) => (
                                    <option key={index} value={index}>{mojong.name}</option>
                                ))}
                            </Form.Select>
                            <FormControl.Feedback type='invalid'>{fbCategory}</FormControl.Feedback>
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
                            <Form.Control size="lg" type="text" pattern="\d*" inputMode="numeric" placeholder='ex) 500원' isInvalid={invalidPrice} value={price === 0 ? '':price.toLocaleString('ko-KR')} onChange={(e) => priceChange(e.target.value.trim())} />
                            <FormControl.Feedback type='invalid'>{fbPrice}</FormControl.Feedback>
                        </Form.Group>
                    </Form>
                </div>

                <div className='w-100 bg-white p-2'>
                    <Button variant='success' className='w-100  fs-5 fw-semibold p-2 rounded-3' onClick={() => submit()}>추가하기</Button>
                </div>
            </div>
        </div>
    );

}

export default CreateProduct;