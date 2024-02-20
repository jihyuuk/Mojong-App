import React, { useEffect, useState } from 'react';
import SubHeader from '../../componets/common/SubHeader';
import MemberView from './view/memberView';
import JoinView from './view/joinView';
import { useToken } from '../../custom/provider/TokenContext';
import ServerApi from '../../server/ServerApi';

function MemberPage() {

    //선택여부
    const [selected, setSelected] = useState('members');
    //서버연동 필요 토큰
    const { token, removeToken, updateToken } = useToken();

    //회원목록
    const [members, setMembers] = useState([]);
    //가입대기
    const [joins, setJoins] = useState([]);

    const fetchMembers = ()=>{
        console.log('멤버 불러오기')
        ServerApi('get', '/members', null, token, removeToken, updateToken)
        .then(response => {
            //성공
            console.log(response)
            setMembers(response.members);
            setJoins(response.joins);
        })
        .catch(error => {
            //에러처리
            alert("데이터 불러오기 실패, 관리자에게 문의하세요")
            console.error(error);
        })
    }


    useEffect(() => {
        //서버통신
        fetchMembers();
    }, [])


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
            <div className='my-content pb-0 bg-white'>
                {selected === 'members' ? <MemberView value={{members,setMembers,fetchMembers}} /> : <JoinView value={{joins,setJoins,fetchMembers}} />}
            </div>

        </div>
    );
}

export default MemberPage;