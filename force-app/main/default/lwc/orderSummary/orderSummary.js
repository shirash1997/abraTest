import { LightningElement, api } from 'lwc';

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

  handleReset() {
    this.dispatchEvent(new CustomEvent('reset'));
  }
}
