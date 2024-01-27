class ShoppingCart{

    constructor(){
        this.list = [];
    }

    addItem(item){
        this.list.push(item);
    }

    removeItem(item){
        myList = myList.filter(item => item !== valueToRemove);
    }

}

export default ShoppingCart;