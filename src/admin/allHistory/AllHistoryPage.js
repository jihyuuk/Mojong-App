import React from 'react';
import SubHeader from '../../componets/common/SubHeader';
import AllHistoryView from './AllHistoryView';

function AllHistoryPage() {

    return (
        <div className='my-container'>

            {/* 헤더 */}
            <SubHeader value='전체기록' to='/'></SubHeader>

            {/* 내용 */}
            <AllHistoryView></AllHistoryView>

        </div>
    );
}

export default AllHistoryPage;