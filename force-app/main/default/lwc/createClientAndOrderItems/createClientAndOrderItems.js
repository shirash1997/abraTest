import { LightningElement, api } from 'lwc';
import processGuestCheckout from '@salesforce/apex/CartCheckoutController.processGuestCheckout';

export default class ClientInfoModal extends LightningElement {
    @api cartItems = [];
    @api showModal = false;

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

        processGuestCheckout({
            name: fullName,
            email: email,
            phone: phone,
            cartItems: formattedCartItems
        })
        .then(() => {
            alert('✨ ההזמנה בוצעה בהצלחה!');
            this.closeModal();
        })
        .catch(error => {
            console.error('שגיאה בשליחת הזמנה:', error);
            alert('⚠️ אירעה שגיאה בעת שליחת ההזמנה.');
        });
    }
}
