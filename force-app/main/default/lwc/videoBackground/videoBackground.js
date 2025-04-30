import { LightningElement, api } from 'lwc';

export default class VideoBackground extends LightningElement {
    @api videoUrl; // קבלה של הוידאו דרך API

    connectedCallback() {
        console.log('Video URL:', this.videoUrl);
    }
}