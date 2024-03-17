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
                console.error("장바구니 추가 에러 발생");
                alert("동일한 이름, 다른 가격인 아이템이 이미 장바구니에 존재합니다.");
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
    const removeCart = (removeIndex) => {
        //경고창 띄우기
        const updateCart = [...cart];
        updateCart.splice(removeIndex,1);
        setCart(updateCart);
    }

    //더하기 빼기 버튼
    const plusMinus = (index, isPlus) => {
        const target = cart[index];

        //1인데 마이너스 버튼 누른경우
        if(!isPlus && target.quantity <=1 ) return;

        target.quantity += isPlus ? 1 : -1;
        target.total = target.price * target.quantity;

        const copy = [...cart];
        copy[index] = target;
        setCart(copy);
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

    //제공변수들
    const cartContextValue = {
        cart,
        addCart,
        removeCart,
        plusMinus,
        totalPrice,
        totalQuantity,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}