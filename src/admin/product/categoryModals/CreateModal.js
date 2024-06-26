import React, { useState } from "react";
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useToken } from "../../../custom/provider/TokenContext";
import { useMojong } from "../../../custom/provider/MojongContext";
import axios from "axios";

function CreateModal(props) {

    //모달
    const {show, handleClose} = props.modal;

    //인풋
    const [input, setInput] = useState('');
    const onChange = (value) => {
        setInvaild(false);
        setInput(value);
    }

    //검증
    const [invalid, setInvaild] = useState(false);
    const [msg,setMsg] = useState('');

    //토큰
    const { token } = useToken();

    //모종새로고침
    const { fetchMojong } = useMojong();


    //추가버튼
    const submit = () => {
        if(!input){
            setInvaild(true);
            setMsg('값을 입력해주세요.')
            return;
        }

        //서버연동
        axios.post(
            process.env.REACT_APP_API_URL + "/category",
            {name:input},
            { headers: { 'Authorization': token } }
        )
        .then(respnose=>{
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

    //추가모달
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader className='border-bottom border-success-subtle border-2'>
                <ModalTitle>카테고리 추가하기</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <FormLabel className='fw-medium mb-3'>카테고리 이름</FormLabel>
                <FormControl className='mb-3' autoFocus isInvalid={invalid} value={input} onChange={(e)=>onChange(e.target.value.trim())}></FormControl>
                <FormControl.Feedback type="invalid">{msg}</FormControl.Feedback>
            </ModalBody>

            <div className='d-flex gap-1 p-2 border-top'>
                <Button variant='secondary' className='w-100' onClick={() => handleClose()}>닫기</Button>
                <Button variant='success' className='w-100' onClick={()=>submit()}>추가하기</Button>
            </div>
        </Modal>
    )
}

export default CreateModal;