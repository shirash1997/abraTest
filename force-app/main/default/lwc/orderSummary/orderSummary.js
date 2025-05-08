import { LightningElement, api } from 'lwc';
import resetOrders from '@salesforce/apex/GroupOrderController.resetOrders';

export default class OrderSummary extends LightningElement {
  @api orders = [];
  @api currentCustomerName = '';

  get totalAll() {
    return this.orders.reduce((sum, item) => sum + item.price, 0);
  }

  get personalTotal() {
    return this.orders
      .filter(o => o.name === this.currentCustomerName)
      .reduce((sum, item) => sum + item.price, 0);
  }

  get hasOrders() {
    return this.orders.length > 0;
  }

  handleResetOrders() {
    resetOrders()
      .then(() => {
        this.orders = [];
        alert('כל ההזמנות נמחקו בהצלחה');
      })
      .catch(error => {
        console.error('שגיאה באיפוס ההזמנות:', error);
        alert('אירעה שגיאה בעת מחיקת ההזמנות');
      });
  }
  
}
