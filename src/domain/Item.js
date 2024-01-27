class Item{

    constructor(name,description,price){
        this.name = name
        this.description = description;
        this.price = price;
        this.count = 0;
    }

    countUP(){
        this.count+=1;
    }

    countDown(){
        this.count-=1;
    }

    getTotal(){
        return this.price * this.count;
    }
}

export default Item;