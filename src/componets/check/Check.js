import React, { useState } from 'react';
import SubHeader from '../subHeader/SubHeader';
import CheckView from './CheckView';
import CheckBtn from '../bottomBtn/CheckBtn';

function Check() {

    //결제 버튼 활성화 여부
    const [ disabled, setDisabled ] = useState(false);
    //결제 수단
    const [ pay, setPay ] = useState('card');

    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='정산하기' to='/shopping-cart'></SubHeader>

            {/* 내용 */}
            <CheckView setDisabled={setDisabled} pay={pay} setPay={setPay}></CheckView>

            {/* 하단버튼 */}
            <CheckBtn disabled={disabled} pay={pay}></CheckBtn>

        </div>
    );
}

export default Check;