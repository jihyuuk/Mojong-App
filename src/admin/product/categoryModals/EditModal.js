import React, { useState } from "react";
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useToken } from "../../../custom/provider/TokenContext";
import { useMojong } from "../../../custom/provider/MojongContext";
import axios from "axios";

function EditModal(props) {

    //props로 받은 모종,모달 정보
    const { show, handleClose } = props.modal;
    const mojong = props.mojong;

    //토큰
    const { token } = useToken();

    //모종 데이터 새로고침용
    const { fetchMojong } = useMojong();

    //인풋
    const [input, setInput] = useState(mojong.name);
    const onChange = (value) => {
        setInvaild(false);
        setInput(value);
    }

    //검증
    const [invalid, setInvaild] = useState(false);
    const [msg, setMsg] = useState('')

    //수정버튼
    const submit = () => {
        if (!input) {
            setInvaild(true);
            setMsg('값을 입력해주세요.');
            return;
        }
        if (input === mojong.name) {
            setInvaild(true);
            setMsg('변경된 내용이 없습니다.');
            return;
        }


        //서버연동
        axios.put(
            process.env.REACT_APP_API_URL + "/category/"+mojong.id,
            {name:input},
            { headers: { 'Authorization': token } }
        )
        .then(respnose=>{
            console.log("수정 성공")
            fetchMojong();
            handleClose();
        })
        .catch(error=>{
            //카테고리명 중복시
            if(error.response && error.response.status === 409){
                setInvaild(true);
                setMsg('중복된 카테고리명 입니다.')
                return;
            }

            alert("카테고리 추가하기 실패, 관리자에게 문의하세요")
            console.error(error);
        });

    }


    //수정모달
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader className='border-bottom border-success-subtle border-2'>
                <ModalTitle>카테고리 편집</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <FormLabel className='fw-medium mb-3 fs-5'>카테고리 : <span className='text-success'>{mojong.name}</span></FormLabel>
                <FormControl className='mb-3 fs-5' value={input} onChange={(e) => onChange(e.target.value.trim())} isInvalid={invalid}></FormControl>
                <FormControl.Feedback type="invalid">{msg}</FormControl.Feedback>
            </ModalBody>

            <div className='d-flex gap-1 p-2 border-top'>
                <Button variant='secondary' className='w-100' onClick={() => handleClose()}>닫기</Button>
                <Button variant='success' className='w-100' onClick={() => submit()}>수정하기</Button>
            </div>
        </Modal>
    );
}

export default EditModal;