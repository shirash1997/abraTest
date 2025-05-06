import { LightningElement, api } from 'lwc';
import processGuestCheckout from '@salesforce/apex/CartCheckoutController.processGuestCheckout';

export default class createClientAndOrderItems extends LightningElement {
    @api cartItems = [];
    @api showModal = false;
    @api totalPrice;

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
            totalPrice: this.totalPrice // ⬅️ כאן היה הבאג
        })
        .then(() => {
            alert('✨ ההזמנה בוצעה בהצלחה!');
            this.closeModal();
            this.dispatchEvent(new CustomEvent('orderplaced', { detail: true}));

        })
        .catch(error => {
            console.error('שגיאה בשליחת הזמנה:', error);
            alert('⚠️ אירעה שגיאה בעת שליחת ההזמנה.');
        });
    }
}
