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
    const [cartTotal, setCartTotal] = useState(0);
    //총 수량
    const [cartQuantity, setCartQuantity] = useState(0);

    //할인 가격
    const [salePrice, setSalePrice] = useState(0);
    //최종 가격
    const [finalPrice, setFinalPrice] = useState(0);

    //카트 관련=========================================================================
    //추가
    const addCart = (addItem) => {
        //갯수 0 일시 추가 x
        if (addItem.quantity <= 0) return;

        //이미 같은 항목이 담겨 있나 확인
        const existingIndex = cart.findIndex(item => item.name === addItem.name);

        if (existingIndex !== -1) {
            //담겨있다면 카운트 합치기
            const copyCart = [...cart];
            copyCart[existingIndex].quantity += addItem.quantity;

            setCart(copyCart);
        } else {
            //아니라면 그냥 더하기
            setCart([...cart, addItem]);
        }
    }

    //삭제
    const removeCart = (deleteItem) => {
        //경고창 띄우기
        const updateCart = cart.filter(item => item.name !== deleteItem.name);
        setCart(updateCart);
    }

    //카트 변경시 합계,수량 변경됨
    useEffect(()=>{
        let totalPrice= 0;
        let totalQuantity = 0;

        cart.forEach(item=>{
            totalPrice += item.totalPrice;
            totalQuantity += item.quantity;
        })

        setCartTotal(totalPrice);
        setCartQuantity(totalQuantity);
    },[cart])


    //할인 관련========================================================================
    //원
    const saleWon = (price) => {
        //검증
        //할인가격 적용
        setSalePrice(price);
    }
    //%
    const salePercent = (price) => {
        //검증
        //할인가격적용
        setSalePrice(cartTotal / 100 * price);
    }
    //할인 취소
    const removeSale = () => {
        setSalePrice(0);
    }

    //합계,할인가격 변경시 최종금액 변경됨
    useEffect(()=>{
        setFinalPrice(cartTotal-salePrice);
    },[cartTotal,salePrice])


    //제공변수들
    const cartContextValue = {
        cart,
        addCart,
        removeCart,
        cartTotal,
        cartQuantity,
        saleWon,
        salePercent,
        removeSale,
        salePrice,
        finalPrice
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}