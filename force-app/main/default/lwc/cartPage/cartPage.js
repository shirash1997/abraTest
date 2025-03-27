import { LightningElement, api, track } from 'lwc';

export default class CartPage extends LightningElement {
    @api cartItems = []; // רשימת הפריטים שנשלחים לעגלה

    get totalPrice() {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    get PriceForItem(){
        return item.price * item.quantity;
    }

    connectedCallback(){
        console.log('cartItems:', this.cartItems);
    }
}
