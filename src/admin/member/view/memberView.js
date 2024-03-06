import React, { useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ServerApi from '../../../server/ServerApi';
import { useToken } from '../../../custom/provider/TokenContext';

function MemberView(props) {

    const {members, setMembers, fetchMembers} = props.value;
    //회원 정보
    //id
    //이름
    //가입일
    //enabled 여부
 
    const { token, removeToken, updateToken } = useToken();


    //차단버튼
    const block = (event, index, blocking) => {
        //비활성화
        event.target.disabled = true;

        //서버통신
        ServerApi('post', '/block',
            {
                'blocking' : blocking,
                'userId': members[index].id,
            },
            token, removeToken, updateToken
        )
            .then(response => {
                //성공
                event.target.disabled = false;
                //성공처리
                fetchMembers();
                //토스트
            })
            .catch(error => {
                //에러처리
                alert("요청 실패, 관리자에게 문의하세요")
                console.error(error);
                event.target.disabled = false;
            })
    }



    return (
        <ListGroup>
            {members.map((member, index) => (

                <ListGroupItem key={index}>
                    <div className='d-flex align-items-center'>
                        <div className='flex-grow-1'>
                            <div className='fs-5 fw-medium'>{member.username} {!member.enabled && <span className='text-danger'>(차단됨)</span>} {member.role ==='ROLE_ADMIN' && <span className='text-success'>(운영자)</span>} </div>
                            <div className='mt-1 text-secondary fw-medium' style={{ fontSize: '0.85rem' }}>가입일 {member.createdDate}</div>
                        </div>
                        <div>
                            {member.enabled ?
                                <Button variant='outline-danger' className='px-3 fw-medium' onClick={(event) => block(event, index, true)}>
                                    차단
                                </Button>
                                :
                                <Button variant='outline-success' className='px-3 fw-medium' onClick={(event) => block(event, index, false)}>
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