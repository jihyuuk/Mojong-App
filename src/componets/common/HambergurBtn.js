import React, { useContext, useEffect, useState } from 'react';
import { Button, ListGroup, Offcanvas, OffcanvasHeader, OffcanvasTitle, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useToken } from '../../custom/provider/TokenContext';
import { useAuth } from '../../custom/provider/AuthContext';
import axios from 'axios';

function HamburgerBtn() {

  //토큰
  const { token, removeToken } = useToken();
  //유저정보
  const { username, role } = useAuth();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  //오늘의 판매 로딩
  const [loading, setLoading] = useState(true);
  const [todaySale, setTodaySale] = useState();

  //로그아웃 핸들링
  const handleLogout = () => {
    //저장소에 토큰 지우기
    removeToken();
    //로그인 페이지로 리다이렉트
    window.location.replace('/login');
  }

  //햄버거 열릴때 오늘의 판매 가져오기
  useEffect(() => {
    if (!show) return;
    console.log('열려라 키움의 송성문~');

    //로딩 true
    setLoading(true);

    //서버 요청
    const url = process.env.REACT_APP_API_URL + (role === 'ROLE_ADMIN' ? '/allTodaySale' : '/todaySale');

    axios.get(url, { headers: { 'Authorization': token } })
      .then(response => {
        setTodaySale(response.data);
        console.log(response.data);
        setLoading(false);
      }).catch(error => {
        console.error('오늘의 판매 정보 불러오기 실패!');
      })

  }, [show])

  return (
    <>
      {/* 햄버거버튼 */}
      <div className='px-2' onClick={toggleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
      </div>


      {/* 내용 */}
      <Offcanvas show={show} onHide={handleClose} backdrop={true} scroll={true} style={{ width: '60%', maxWidth: '300px' }}>

        {/* 헤더 */}
        <Offcanvas.Header closeButton className='border-bottom'>
          <Offcanvas.Title className='fw-bold fs-4'>{username}님</Offcanvas.Title>
        </Offcanvas.Header>

        {/* 목록 */}
        <Offcanvas.Body id='hambergur-menu' className='d-flex flex-column'>

          {/* 오늘의 판매 통계 */}
          <div className='border border-success-subtle rounded-3 p-2 bg-body-tertiary'>
            <div className='fs-5 fw-semibold mb-2'>🏅 오늘 판매 업적 </div>
            {loading ?
              <>
                불러오는중... <Spinner animation="border" size="sm" />
              </>
              :
              <>
                <div>
                  <div>판매: {todaySale.count}건</div>
                  <div>총액: {todaySale.price.toLocaleString('ko-KR')}원</div>
                </div>

                {/* 관리자만 */}
                {role === 'ROLE_ADMIN' &&
                  <div className='mt-2'>
                    <div>전체 판매: {todaySale.allCount}건</div>
                    <div>전체 총액: {todaySale.allPrice.toLocaleString('ko-KR')}원</div>
                  </div>
                }
              </>
            }
          </div>

          <ListGroup variant='flush fs-5 mt-4'>

            <ListGroup.Item className='py-2'>
              <Link to="/history">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock-history me-3" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                  </svg>
                  판매기록
                </div>
              </Link>
            </ListGroup.Item>

            {/* <ListGroup.Item className='py-2'>
              <Link to="/" replace={true}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-floppy me-3" viewBox="0 0 16 16">
                    <path d="M11 2H9v3h2z" />
                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                  </svg>
                  임시저장
                </div>
              </Link>
            </ListGroup.Item> */}

            <ListGroup.Item className='py-2'>
              <Link to="/shopping-cart">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag me-3" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                  장바구니
                </div>
              </Link>
            </ListGroup.Item>

            {/* <ListGroup.Item className='py-2'>
              <Link to="/receipt">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-receipt-cutoff me-3" viewBox="0 0 16 16">
                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5M11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                    <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118z" />
                  </svg>
                  영수증
                </div>
              </Link>
            </ListGroup.Item> */}

            {/* 관리자만 */}
            {role === 'ROLE_ADMIN' && <>

              <ListGroup.Item className='mt-3 py-2'>
                <Link to="/member">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person me-3" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    직원관리
                  </div>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className='py-2'>
                <Link to="/product">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-seam me-3" viewBox="0 0 16 16">
                      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                    </svg>
                    상품관리
                  </div>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className='py-2'>
                <Link to="/all-history">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock-history me-3" viewBox="0 0 16 16">
                      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    전체기록
                  </div>
                </Link>
              </ListGroup.Item>

            </>
            }

          </ListGroup>

          {/* 하단로고 */}
          <div className='mt-auto text-center'>

            {/* 로그아웃버튼 */}
            <div className='mb-2'>
              <Button variant="outline-success w-100 rounded-5" onClick={() => handleLogout()}>
                로그아웃
              </Button>
            </div>

            <img src={process.env.PUBLIC_URL + '/logo2.png'} className='w-50 px-2' />
          </div>

        </Offcanvas.Body>

      </Offcanvas>

    </>
  )
}

export default HamburgerBtn;