import { LightningElement, api, track } from 'lwc';

export default class CartPage extends LightningElement {
    @api cartItems; // רשימת הפריטים שנשלחים לעגלה
    @track showCustomerPopup = false;

    get totalPrice() {
        return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    }

    showModal = false;

    handleCheckoutClick() {
        this.showModal = true;
    }
    
    handleCloseModal() {
        this.showModal = false;
    }
    

        connectedCallback(){
            console.log('📦 cartItems: ', JSON.stringify(this.cartItems));
        }

        handleCheckout() {
            // כאן אפשר להחליף לניווט אמיתי או שליחת אירוע
            alert('עוברים לתשלום...');
            // this.dispatchEvent(new CustomEvent('checkout'));
        }

        openCustomerPopup() {
            this.showCustomerPopup = true;
        }
    
        handleCustomerDetails(event) {
            const { name, email, phone } = event.detail;
            console.log('📦 פרטי לקוח:', name, email, phone);
    
            // כאן תקראי ל-Apex עם cartItems ופרטים נוספים
        }
}