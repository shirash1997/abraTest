import { LightningElement } from 'lwc';
import videoResource from '@salesforce/resourceUrl/backgroundVideo';

export default class VideoBackground extends LightningElement {
     videoUrl = `${videoResource}/videoBackground/video.html`;
    connectedCallback() {
        console.log('Video URL:', this.videoUrl);
    }
}
