import React, { useEffect, useState } from 'react';
import SubHeader from '../../componets/common/SubHeader';
import MemberView from './view/memberView';
import JoinView from './view/joinView';
import { useToken } from '../../custom/provider/TokenContext';
import axios from 'axios';

function MemberPage() {

    //직원목록 or 가입대기 선택여부
    const [selected, setSelected] = useState('members');

    //서버연동 필요 토큰
    const { token } = useToken();

    useEffect(() => {
        //서버통신
        fetchMembers();
    }, [])

    //직원목록
    const [members, setMembers] = useState([]);
    //가입대기
    const [joins, setJoins] = useState([]);

    //서버 연동
    const fetchMembers = ()=>{

        axios.get(process.env.REACT_APP_API_URL + "/members", { headers: { 'Authorization': token } })
        .then(response => {
            setMembers(response.data.members);
            setJoins(response.data.joins);
        }).catch(error => {
            alert("데이터 불러오기 실패!");
        })

    }


    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='직원관리' to='/'></SubHeader>

            {/* 카테고리 */}
            <div className='d-flex bg-white fs-5 fw-medium text-secondary border-bottom'>
                <div className={`text-center py-2 w-100 ${selected === 'members' ? 'selected' : ''}`} onClick={() => setSelected('members')}>직원목록</div>
                <div className='border-end'></div>
                <div className={`text-center py-2 w-100 ${selected === 'join' ? 'selected' : ''}`} onClick={() => setSelected('join')}>가입대기</div>
            </div>

            {/* 뷰 */}
            <div className='my-content bg-white'>
                {selected === 'members' ? <MemberView value={{members, fetchMembers}} /> : <JoinView value={{joins, fetchMembers}} />}
            </div>

        </div>
    );
}

export default MemberPage;