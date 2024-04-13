import React, { useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useToken } from '../../../custom/provider/TokenContext';
import axios from 'axios';

function MemberView(props) {

    const { members, fetchMembers } = props.value;
    //회원 정보
    //id
    //이름
    //가입일
    //enabled 여부

    const { token } = useToken();


    //차단버튼
    const block = (event, userId, blocking) => {
        //비활성화
        event.target.disabled = true;
        const url = process.env.REACT_APP_API_URL + '/members/' + userId + '/' + ( blocking ? 'block' : 'unBlock');

        axios.put(url, null, { headers: { 'Authorization': token } })
            .then(response => {
                //성공처리
                fetchMembers();
            }).catch(error => {
                //에러처리
                alert("요청 실패, 관리자에게 문의하세요")
            }).finally(()=>{
                event.target.disabled = false;
            })
    }



    return (
        <ListGroup>
            {members.map((member, index) => (

                <ListGroupItem key={index}>
                    <div className='d-flex align-items-center'>
                        <div className='flex-grow-1'>
                            <div className='fs-5 fw-medium'>{member.username} {!member.enabled && <span className='text-danger'>(차단됨)</span>} {member.role === 'ROLE_ADMIN' && <span className='text-success'>(운영자)</span>} </div>
                            <div className='mt-1 text-secondary fw-medium' style={{ fontSize: '0.85rem' }}>가입일 {member.createdDate}</div>
                        </div>
                        <div>
                            {member.enabled ?
                                <Button variant='outline-danger' className='px-3 fw-medium' onClick={(event) => block(event, member.id, true)}>
                                    차단
                                </Button>
                                :
                                <Button variant='outline-success' className='px-3 fw-medium' onClick={(event) => block(event, member.id, false)}>
                                    차단해제
                                </Button>
                            }
                        </div>
                    </div>
                </ListGroupItem>

            ))}
        </ListGroup>
    )
}

export default MemberView;