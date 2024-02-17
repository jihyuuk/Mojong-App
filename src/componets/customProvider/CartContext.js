import React, { createContext, useContext, useEffect, useState } from 'react';

//장바구니 컨텍스트
const CartContext = createContext();

//장바구니 컨텍스트를 사용할 커스텀 훅
export function useCart() {
    return useContext(CartContext);
}


// 장바구니 컨텍스트 Provider
export function CartProvider({ children }) {

    //아이템들
    const [cart, setCart] = useState([]);
    //총 합계
    const [totalPrice, setTotalPrice] = useState(0);
    //총 수량
    const [totalQuantity, setTotalQuantity] = useState(0);


    //할인 조건
    const [saleCondition, setSaleCondition] = useState('won');
    //할인 입력
    const [saleInput, setSaleInput] = useState(0);
    //할인 가격
    const [salePrice, setSalePrice] = useState(0);

    //최종 가격
    const [finalPrice, setFinalPrice] = useState(0);

    //카트 관련=========================================================================
    //추가
    const addCart = (name, price, quantity) => {
        //갯수 0 일시 추가 x
        if (quantity <= 0) return;

        const addItem = { 'name': name, 'price': price, 'quantity': quantity, 'total': price * quantity };

        //이미 같은 항목이 담겨 있나 확인
        const existingIndex = cart.findIndex(item => item.name === addItem.name);

        if (existingIndex !== -1) {
            //담겨있다면 카운트 합치기
            const copyCart = [...cart];
            //검증
            if (copyCart[existingIndex].price != addItem.price) {
                //이름은 동일한데 가격은 다른 아이템 추가시
                console.error("중복된 이름의 다른 가격의 아이템이 장바구니에 존재합니다.");
                alert("장바구니 추가 에러 발생");
                return false;
            }

            copyCart[existingIndex].quantity += addItem.quantity;
            copyCart[existingIndex].total = copyCart[existingIndex].quantity * copyCart[existingIndex].price;

            setCart(copyCart);
        } else {
            //아니라면 그냥 더하기
            setCart([...cart, addItem]);
        }

        return true;
    }

    //삭제
    const removeCart = (deleteItem) => {
        //경고창 띄우기
        const updateCart = cart.filter(item => item.name !== deleteItem.name);
        setCart(updateCart);
    }

    //카트 변경시 합계,수량 변경됨
    useEffect(() => {
        let tempTotal = 0;
        let tempQuantity = 0;

        cart.forEach(item => {
            tempTotal += item.total;
            tempQuantity += item.quantity;
        })

        setTotalPrice(tempTotal);
        setTotalQuantity(tempQuantity);
    }, [cart])


    //할인 관련========================================================================

    //할인 조건 변경
    const saleConditionChange = ()=>{
        //입력값 초기화
        saleInputChange(0);

        if(saleCondition === 'won'){
            setSaleCondition('percent');
        }else{
            setSaleCondition('won');
        }
    }

    //입력값 변경시 할인적용
    const saleInputChange = (value) => {

        if(value <= 0 || value === ''){
            setSaleInput('');
            setSalePrice(0);
            return;
        }

        setSaleInput(value);

        if(saleCondition === 'won'){
            saleWon(value);
        }else{
            salePercent(value);
        }
    }

    //won일때
    const saleWon = (value) => {
        //검증
        setSalePrice(value);
    }

    //percent일때
    const salePercent = (value) => {
        setSalePrice(totalPrice / 100 * value);
    }

    //합계,할인가격 변경시 최종금액 변경됨
    useEffect(() => {
        console.log("totalPrcie : " + totalPrice);
        console.log("salePrice : " + salePrice);
        console.log("finalPrice : " + finalPrice);
        setFinalPrice(totalPrice - salePrice);
    }, [totalPrice, salePrice])


    //제공변수들
    const cartContextValue = {
        cart,
        addCart,
        removeCart,
        totalPrice,
        totalQuantity,

        saleCondition,
        saleConditionChange,
        saleInput,
        saleInputChange,
        salePrice,
        
        finalPrice
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}