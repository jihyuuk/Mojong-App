import React from 'react';
import SubHeader from '../subHeader/SubHeader';
import HistoryView from './HistoryView';

function History(){

    return(
        <div className='my-container'>

        {/* 헤더 */}
        <SubHeader value='판매기록' to='/'></SubHeader>

        {/* 내용 */}
        <HistoryView></HistoryView>

    </div>
    );
}

export default History;