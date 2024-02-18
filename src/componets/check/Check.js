import React from 'react';
import SubHeader from '../subHeader/SubHeader';
import CheckView from './CheckView';

function Check() {

    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='정산하기' to='/shopping-cart'></SubHeader>

            {/* 내용 */}
            <CheckView></CheckView>

        </div>
    );
}

export default Check;