import { LightningElement, api, track } from 'lwc';

export default class CartPage extends LightningElement {
    @api cartItems; // רשימת הפריטים שנשלחים לעגלה

    get totalPrice() {
        return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    }



        connectedCallback(){
            console.log('📦 cartItems: ', JSON.stringify(this.cartItems));
        }

        handleCheckout() {
            // כאן אפשר להחליף לניווט אמיתי או שליחת אירוע
            alert('עוברים לתשלום...');
            // this.dispatchEvent(new CustomEvent('checkout'));
        }
}