import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useToken } from '../../../custom/provider/TokenContext';
import axios from 'axios';

function JoinView(props) {

    const { joins, fetchMembers } = props.value;

    //서버연동 필요 토큰
    const { token } = useToken();

    const approval = (index, userId, approve) => {
        //버튼 비활성화
        const approveBtn = document.getElementById('approve-' + index);
        const rejectBtn = document.getElementById('reject-' + index);
        approveBtn.disabled = true;
        rejectBtn.disabled = true;

        const url = process.env.REACT_APP_API_URL + '/members/' + userId + '/' + ( approve ? 'approval' : 'disApproval');

        axios.put(url, null, { headers: { 'Authorization': token } })
        .then(response => {
            //성공처리
            fetchMembers();
        }).catch(error => {
            //에러처리
            alert("요청 실패, 관리자에게 문의하세요")
        }).finally(()=>{
            approveBtn.disabled = false;
            rejectBtn.disabled = false;
        })

    }

    return (
        <ListGroup>

            {joins.map((user, index) => (

                <ListGroupItem key={index}>
                    <div className='d-flex align-items-center'>
                        <div className='flex-grow-1'>
                            <div className='fs-5 fw-medium'>{user.username}</div>
                            <div className='mt-1 text-secondary fw-medium' style={{ fontSize: '0.85rem' }}>신청일 {user.createdDate}</div>
                        </div>
                        <div>
                            <Button id={`approve-${index}`} variant='outline-danger' className='px-3 fw-medium me-2' onClick={() => approval(index, user.id, false)}>
                                거부
                            </Button>
                            <Button id={`reject-${index}`} variant='outline-success' className='px-3 fw-medium' onClick={() => approval(index, user.id, true)}>
                                승인
                            </Button>
                        </div>
                    </div>
                </ListGroupItem>

            ))}

        </ListGroup>
    )
}

export default JoinView;