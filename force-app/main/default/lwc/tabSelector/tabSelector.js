import { LightningElement, api } from 'lwc';

export default class TabSelector extends LightningElement {
  @api activeTab;

  get eveningTabClass() {
    return this.activeTab === 'evening' ? 'tab-button active' : 'tab-button';
  }

  get dessertTabClass() {
    return this.activeTab === 'dessert' ? 'tab-button active' : 'tab-button';
  }

  get wineTabClass() {
    return this.activeTab === 'wine' ? 'tab-button active' : 'tab-button';
  }

  handleClickEvening() {
    this.dispatchEvent(new CustomEvent('tabchange', { detail: 'evening' }));
  }

  handleClickDessert() {
    this.dispatchEvent(new CustomEvent('tabchange', { detail: 'dessert' }));
  }

  handleClickWine() {
    this.dispatchEvent(new CustomEvent('tabchange', { detail: 'wine' }));
  }
}
