import { LightningElement, api, track } from 'lwc';
import processGuestCheckout from '@salesforce/apex/CartCheckoutController.processGuestCheckout';
import sendOrderEmail from '@salesforce/apex/CafeOrderMailer.sendOrderEmail';

export default class createClientAndOrderItems extends LightningElement {
    @api cartItems = [];
    @api showModal = false;
    @api totalPrice;
    @track createdOrderId;
    @track deliveryType = 'pickup';


    get isDelivery() {
        return this.deliveryType === 'delivery';
    }
    closeModal() {
        this.showModal = false;
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    handleDeliveryChange(event) {
        this.deliveryType = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();

        const fields = event.target.elements;
        const fullName = fields.fullName.value;
        const email = fields.email.value;
        const phone = fields.phone.value;
        const address = this.isDelivery ? fields.address.value : null;

        const formattedCartItems = this.cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.totalPrice
        }));

        console.log('🛒 Cart:', JSON.stringify(formattedCartItems));
        console.log('📦 Delivery Type:', this.deliveryType);
        console.log('📍 Address:', address);

        processGuestCheckout({
            name: fullName,
            email: email,
            phone: phone,
            address: address,
            deliveryType: this.deliveryType,
            cartItems: formattedCartItems,
            totalPrice: this.totalPrice
        })
        .then((orderId) => {
        
            this.createdOrderId = orderId;
            this.closeModal();
            this.dispatchEvent(new CustomEvent('orderplaced', { detail: true }));

            return sendOrderEmail({ orderId: orderId, email: email });
        })
        .then(() => {
            console.log('📧 מייל נשלח בהצלחה');
        })
        .catch(error => {
            console.error('שגיאה:', error);
            alert('⚠️ שגיאה בהזמנה או בשליחת מייל');
        });
    }
}