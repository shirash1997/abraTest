import { LightningElement, track } from 'lwc';

export default class DualRangeSlider extends LightningElement {
  min = 0;
  max = 100;

  @track minValue = 0;
  @track maxValue = 100;

  get trackStyle() {
    const start = ((this.minValue - this.min) / (this.max - this.min)) * 100;
    const end = ((this.maxValue - this.min) / (this.max - this.min)) * 100;
    return `background: linear-gradient(to right, #ddd ${start}%, #00a1e0 ${start}%, #00a1e0 ${end}%, #ddd ${end}%);`;
  }

  handleMinChange(event) {
    const newMin = parseInt(event.target.value, 10);
    if (newMin <= this.maxValue) {
      this.minValue = newMin;
    }
  }

  handleMaxChange(event) {
    const newMax = parseInt(event.target.value, 10);
    if (newMax >= this.minValue) {
      this.maxValue = newMax;
    }
  }

  handleMinInputChange(event) {
    const newMin = parseInt(event.target.value, 10);
    if (!isNaN(newMin) && newMin >= this.min && newMin <= this.maxValue) {
      this.minValue = newMin;
    }
  }

  handleMaxInputChange(event) {
    const newMax = parseInt(event.target.value, 10);
    if (!isNaN(newMax) && newMax <= this.max && newMax >= this.minValue) {
      this.maxValue = newMax;
    }
  }
}
