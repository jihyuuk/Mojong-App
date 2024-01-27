import React from 'react';
import { Badge, Nav, Navbar, Stack } from 'react-bootstrap';
import { Events, Link } from 'react-scroll';

function Category() {

    let targetSection = '';
    let isScrolling = false;

    Events.scrollEvent.register('begin', function (to, element) {
        scrollNav(to + "-nav")
        targetSection = to;
        isScrolling = true;
        console.log("스크롤시작됨 element")
    })

    const handleSetActive = (to) => {
        if (isScrolling) {
            if (`${to}` == targetSection) {
                isScrolling = false;
                console.log("스크롤끝")
            }
            return;
        }
        console.log("hadleSetActive 호출됨")
        scrollNav(`${to}-nav`)
    };

    //바스크롤
    const scrollNav = (sectionNav) => {

        const element = document.getElementById(sectionNav);

        if (element) {
            //이전 badge 의 active 지우기
            const activeElements = document.getElementsByClassName("nav-active")
            for (const activeElement of activeElements) {
                activeElement.classList.remove('nav-active');
            }

            //선택한 badge에 actvie 부여하기
            element.parentNode.classList.add("nav-active")

            const container = document.getElementById('scroll-nav');
            //화면 중앙에 오게
            const targetLeft = element.offsetLeft + (element.offsetWidth / 2) - (container.clientWidth / 2);

            container.scrollTo({
                left: targetLeft,
                behavior: 'smooth',
                ignoreCancelEvents: true
            });
        }
    }


    return (
        <div id="scroll-nav" className='overflow-auto border-bottom' >
            <Navbar>
                <Nav navbarScroll>
                    <Stack direction="horizontal" gap={2} className='p-2 fs-1' id="scroll-nav-stack">
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section1" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section1-nav'>고구마</Link>
                        </Badge>
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section2" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section2-nav'>토마토</Link>
                        </Badge>
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section3" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section3-nav'>고추</Link>
                        </Badge>
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section4" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section4-nav'>호박</Link>
                        </Badge>
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section5" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section5-nav'>과일</Link>
                        </Badge>
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section6" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section6-nav'>채소</Link>
                        </Badge>
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section7" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section7-nav'>쌈채</Link>
                        </Badge>
                        <Badge pill bg="defalut" className='border'>
                            <Link to="section8" offset={-200} spy={true} onSetActive={handleSetActive} ignoreCancelEvents={true} id='section8-nav'>오이</Link>
                        </Badge>
                    </Stack>
                </Nav>
            </Navbar>


        </div>
    )

}

export default Category;

