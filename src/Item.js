export default class Item{
    constructor(id,imageLink, link, title, description, amount,purchased){
        this.id = id;
        this.imageLink = imageLink;
        this.link = link;
        this.title = title;
        this.description = description;
        this.amount = amount;
        this.purchased = purchased;
    }

    refresh(id,imageLink, link, title, description, amount,purchased){
        this.id = id;
        this.imageLink = imageLink;
        this.link = link;
        this.title = title;
        this.description = description;
        this.amount = amount;
        this.purchased = purchased;
    }
}