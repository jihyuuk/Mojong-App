class Category{

    constructor(name){
        this.name = name;
        this.itemList = [];
    }

    addItem(item){
        this.itemList.push(item);
    }

}

export default Category;