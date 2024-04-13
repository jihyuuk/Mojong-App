import React, {  useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, ListGroup } from 'react-bootstrap';
import { useToken } from '../../../custom/provider/TokenContext';
import CreateModal from '../categoryModals/CreateModal';
import EditModal from '../categoryModals/EditModal';
import DeleteModal from '../categoryModals/DeleteModal';
import { useMojong } from '../../../custom/provider/MojongContext';
import axios from 'axios';

function CategoryView(props) {

    const {mojongs, setMojongs, fetchMojong} = useMojong();
    const { token } = useToken();

    //모달
    const [modal,setModal] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setModal('');
    }
    //수정,삭제 
    const handleShow = (modal,mojong) => {
        setModal(modal)
        setShow(true);
        setSelectedMojong({id:mojong.id, name:mojong.name});
    }
    //추가
    const createShow = ()=>{
        setModal('create');
        setShow(true);
    }

    //선택된 모종
    const [selectedMojong, setSelectedMojong] = useState({id:'',name:''});


    //드래그 구현
    const handleDragEnd = (result) => {

        //미리 적용시켜놓고 성공시 아무것도 x 실패시 데이터 다시 불러오기

        // 드래그 앤 드롭이 유효하게 종료된 경우
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;

        //배열복사
        const copyArr = Array.from(mojongs);
        //드래그 요소 빼기고 반환값으로 받아옴
        const [removed] = copyArr.splice(result.source.index, 1);
        //드래그요소 끼워넣기
        copyArr.splice(result.destination.index, 0, removed)
        //적용
        setMojongs(copyArr);


        //서버 반영
        axios.put(
            process.env.REACT_APP_API_URL + "/category/seqChange",
            copyArr.map((mojong) => ({ id: mojong.id, name: mojong.name })), 
            { headers: { 'Authorization': token } })
            .then(response => {
                //console.log("순서 변경 성공!");
            }).catch(error => {
                alert("순서 변경을 실패하였습니다.");
            }).finally(()=>{
                fetchMojong();
            })

    }

    return (
        <>
            <div className='my-content px-2'>

                {/* 총 n개 */}
                <div className='p-2 fw-midium text-secondary'>총 <span className='fw-semibold'>{mojongs.length}</span>개</div>

                {/* 카테고리 리스트 */}
                <ListGroup>
                    {/* 1 */}
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {/* 2 */}
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>

                                    {/* 3 */}
                                    {mojongs.map((mojong, index) => (
                                        <Draggable key={index} draggableId={`draggable-${index}`} index={index}>

                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                    <ListGroup.Item key={index} className='pe-0 rounded-3'>
                                                        <div className='d-flex justify-content-between align-items-center py-2'>
                                                            <div className='fs-5 fw-medium'><span className='text-success'>{index + 1}.</span> {mojong.name}</div>
                                                            <div>
                                                                <span className='p-2' onClick={() => handleShow('edit',mojong)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-square text-success" viewBox="0 0 16 16">
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                                    </svg>
                                                                </span>

                                                                <span className='p-2' onClick={() => handleShow('delete',mojong)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3 text-danger" viewBox="0 0 16 16">
                                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>

                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </ListGroup>

                {/* 콘텐츠끝 */}
            </div>


            {/* 하단버튼 */}
            <div className='text-center p-2 border-top bg-white' onClick={() => createShow()}>
                <Button variant='success' className='w-100 fs-5 fw-semibold p-2 rounded-3'>
                    카테고리 추가하기
                </Button>
            </div>

            {/* 모달들 */}
            {modal === 'create' && <CreateModal modal={{show,handleClose}}/>}
            {modal === 'delete' && <DeleteModal mojong={selectedMojong} modal={{show,handleClose}}/>}
            {modal === 'edit' &&  <EditModal mojong={selectedMojong} modal={{show,handleClose}}/>}

        </>
    )
}

export default CategoryView;