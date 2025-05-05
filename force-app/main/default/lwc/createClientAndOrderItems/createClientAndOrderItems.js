import { LightningElement, api } from 'lwc';
import createClientAndOrderItems from '@salesforce/apex/CartCheckoutController.createClientAndOrderItems';

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
        const fields = event.target;

        const fullName = fields.fullName.value;
        const email = fields.email.value;
        const phone = fields.phone.value;

        createClientAndOrderItems({
            name: fullName,
            email: email,
            phone: phone,
            cartItems: this.cartItems
        })
        .then(() => {
            alert('ההזמנה נשלחה בהצלחה! ✨');
            this.closeModal();
        })
        .catch(error => {
            console.error('שגיאה בשליחת הזמנה:', error);
            alert('אירעה שגיאה בשליחה.');
        });
    }
}
