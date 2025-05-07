import { LightningElement, api, track } from 'lwc';
import processGuestCheckout from '@salesforce/apex/CartCheckoutController.processGuestCheckout';
import sendOrderEmail from '@salesforce/apex/CafeOrderMailer.sendOrderEmail';

export default class createClientAndOrderItems extends LightningElement {
    @api cartItems = [];
    @api showModal = false;
    @api totalPrice;
    @track createdOrderId;

    closeModal() {
        this.showModal = false;
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    handleSubmit(event) {
        event.preventDefault();

        const fields = event.target.elements;
        const fullName = fields.fullName.value;
        const email = fields.email.value;
        const phone = fields.phone.value;

        // הכנה של עגלת פריטים בפורמט מתאים ל־DTO
        const formattedCartItems = this.cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.totalPrice

        }));

        console.log('cart befor apex : ', JSON.stringify(formattedCartItems));
console.log('totalPrice befor apex : ', this.totalPrice);
processGuestCheckout({
    name: fullName,
    email: email,
    phone: phone,
    cartItems: formattedCartItems,
    totalPrice: this.totalPrice
})
.then((orderId) => {
    alert('✨ ההזמנה בוצעה בהצלחה!');
    this.createdOrderId = orderId;
    this.closeModal();
    this.dispatchEvent(new CustomEvent('orderplaced', { detail: true }));
console.log('ההזמנה בוצעה בהצלחה, מספר הזמנה:', this.createdOrderId);
    // שליחת מייל
    sendOrderEmail({ orderId: this.createdOrderId, email: email })
        .then(() => {
            console.log('📧 מייל נשלח בהצלחה');
        })
        .catch(error => {
            console.error('שגיאה בשליחת מייל:', error);
        });
})
.catch(error => {
    console.error('שגיאה בשליחת ההזמנה:', error);
    alert('⚠️ אירעה שגיאה בעת שליחת ההזמנה.');
});
    }
}
