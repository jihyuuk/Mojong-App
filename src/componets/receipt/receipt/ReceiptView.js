import React from 'react';
import { Table } from 'react-bootstrap';
import { useCart } from '../../../custom/provider/CartContext';

function ReceiptView() {

    const {cart, totalPrice} = useCart();

    return (
        <section className='my-content p-3'>

            <div className='p-3 mx-auto bg-white border rounded-3 shadow' style={{ maxWidth: '450px' }}>

                <p className='fw-semibold fs-1 text-center mt-2'>영 수 증</p>
                <div className='fs-6'>
                    <div className='d-flex justify-content-between mt-3'>
                        <span>상호명:(주)그린아그로</span>
                        <span>대표:황용순</span>
                    </div>
                    <p className='mb-0'>주소:인천시 계양구 벌말로596-3</p>
                    <p>전화번호:032-132-1423</p>
                </div>


                <Table responsive="md">
                    <thead>
                        <tr className='border-top'>
                            <th colSpan={5} className='text-center fw-semibold fs-5'>구 매 내 용</th>
                        </tr>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>단가</th>
                            <th>금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => (
                                <tr>
                                    <td className='text-center'>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td className='text-center'>{item.quantity}</td>
                                    <td className='text-end'>{item.price.toLocaleString('ko-KR')}</td>
                                    <td className='text-end'>{item.total.toLocaleString('ko-KR')}</td>
                                </tr>
                            ))
                        }

                    </tbody>

                    <tfoot>
                        {/* {salePrice > 0 &&
                            <tr>
                                <td colSpan={5}>
                                    <div className='d-flex justify-content-between fs-6'>
                                        <span>할인</span>
                                        <span>-{salePrice}</span>
                                    </div>
                                </td>
                            </tr>

                        } */}
                        <tr>
                            <td colSpan={5}>
                                <div className='d-flex justify-content-between fw-semibold fs-6 py-2'>
                                    <span>총 합계 금액</span>
                                    <span>{totalPrice.toLocaleString('ko-KR')}</span>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>

        </section>
    );
}

export default ReceiptView;