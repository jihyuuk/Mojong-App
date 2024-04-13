import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useToken } from "../../../custom/provider/TokenContext";
import { useMojong } from "../../../custom/provider/MojongContext";
import axios from "axios";

function DeleteModal(props) {

    //props로 받은 모종,모달 정보
    const { show, handleClose } = props.modal;
    const mojong = props.mojong;

    //토큰
    const { token } = useToken();

    //모종 데이터 새로고침용
    const { fetchMojong } = useMojong();


    //카테고리 삭제
    const deleteCategory = () => {

        //서버연동
        axios.delete(
            process.env.REACT_APP_API_URL + "/category/"+mojong.id,
            { headers: { 'Authorization': token } }
        )
            .then(respnose => {
                //성공
                //모종데이터 새로고침
                fetchMojong();
                handleClose();
            })
            .catch(error => {
                //에러처리
                alert("카테고리 삭제 실패, 관리자에게 문의하세요")
            });

    }


    //삭제모달
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader className='border-bottom border-success-subtle border-2'>
                <ModalTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3 text-danger" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    <span className='ms-2 text-danger fw-semibold'>카테고리 삭제</span>
                </ModalTitle>
            </ModalHeader>

            <ModalBody className='text-center py-3 fs-4'>
                <div>
                    <div className='text-success fw-semibold'>{mojong.name}</div>
                    <div className='fw-medium'>정말 삭제하시겠습니까?</div>
                </div>
            </ModalBody>

            <div className='d-flex gap-1 p-2 border-top'>
                <Button variant='secondary' className='w-100' onClick={() => handleClose()}>닫기</Button>
                <Button variant='danger' className='w-100' onClick={() => deleteCategory()}>삭제하기</Button>
            </div>
        </Modal>
    )
}

export default DeleteModal;